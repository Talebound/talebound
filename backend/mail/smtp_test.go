package mail

import (
	"bufio"
	"fmt"
	"net"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
)

func TestSendEmailToLocalSMTPWithoutAuthentication(t *testing.T) {
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	require.NoError(t, err)
	t.Cleanup(func() { listener.Close() })
	message := make(chan string, 1)
	go func() {
		conn, err := listener.Accept()
		if err != nil {
			return
		}
		defer conn.Close()
		conn.SetDeadline(time.Now().Add(5 * time.Second))
		fmt.Fprint(conn, "220 localhost SMTP test\r\n")
		scanner := bufio.NewScanner(conn)
		var body strings.Builder
		inData := false
		for scanner.Scan() {
			line := scanner.Text()
			if inData {
				if line == "." {
					message <- body.String()
					fmt.Fprint(conn, "250 accepted\r\n")
					inData = false
				} else {
					body.WriteString(line + "\n")
				}
				continue
			}
			switch {
			case strings.HasPrefix(line, "EHLO"), strings.HasPrefix(line, "HELO"):
				fmt.Fprint(conn, "250 localhost\r\n")
			case strings.HasPrefix(line, "MAIL FROM:"), strings.HasPrefix(line, "RCPT TO:"):
				fmt.Fprint(conn, "250 OK\r\n")
			case line == "DATA":
				inData = true
				fmt.Fprint(conn, "354 send message\r\n")
			case line == "QUIT":
				fmt.Fprint(conn, "221 bye\r\n")
				return
			default:
				fmt.Fprint(conn, "500 unsupported command\r\n")
			}
		}
	}()

	sender := NewSMTPSender("Talebound", "noreply@talebound.test", listener.Addr().String(), "", "")
	require.NoError(t, sender.SendEmail("Local verification", "<p>Verify your email</p>",
		[]string{"developer@talebound.test"}, nil, nil, nil))
	select {
	case body := <-message:
		require.Contains(t, body, "Subject: Local verification")
		require.Contains(t, body, "developer@talebound.test")
		require.Contains(t, body, "Verify your email")
	case <-time.After(5 * time.Second):
		t.Fatal("SMTP server did not receive the message")
	}
}
