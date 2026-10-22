package mail

import (
	"fmt"
	"github.com/jordan-wright/email"
	"net"
	"net/smtp"
	"strings"
)

const (
	smtpAuthAddress   = "email-smtp.eu-central-1.amazonaws.com"
	smtpServerAddress = "email-smtp.eu-central-1.amazonaws.com:587"
)

type EmailSender interface {
	SendEmail(
		subject string,
		content string,
		to []string,
		cc []string,
		bcc []string,
		attachFiles []string,
	) error
}

type AwsSesSender struct {
	name             string
	fromEmailAddress string
	smtpUsername     string
	smtpPassword     string
	smtpEndpoint     string
}

func NewAwsSesSender(name string, fromEmailAddress string, smtpUsername string, smtpPassword string) EmailSender {
	return NewSMTPSender(name, fromEmailAddress, smtpServerAddress, smtpUsername, smtpPassword)
}

// NewSMTPSender accepts host:port, or a hostname using the submission port 587.
// An unauthenticated local SMTP sink needs neither username nor password.
func NewSMTPSender(name, fromEmailAddress, endpoint, smtpUsername, smtpPassword string) EmailSender {
	if !strings.Contains(endpoint, ":") {
		endpoint = net.JoinHostPort(endpoint, "587")
	}
	return &AwsSesSender{
		name:             name,
		fromEmailAddress: fromEmailAddress,
		smtpUsername:     smtpUsername,
		smtpPassword:     smtpPassword,
		smtpEndpoint:     endpoint,
	}
}

func (sender *AwsSesSender) SendEmail(
	subject string,
	content string,
	to []string,
	cc []string,
	bcc []string,
	attachFiles []string,
) error {
	e := email.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", sender.name, sender.fromEmailAddress)
	e.Subject = subject
	e.HTML = []byte(content)
	e.To = to
	e.Cc = cc
	e.Bcc = bcc

	for _, attachFile := range attachFiles {
		_, err := e.AttachFile(attachFile)
		if err != nil {
			return fmt.Errorf("failed to attach file %s: %w", attachFile, err)
		}
	}

	host, _, err := net.SplitHostPort(sender.smtpEndpoint)
	if err != nil {
		return fmt.Errorf("invalid SMTP endpoint: %w", err)
	}
	var smtpAuth smtp.Auth
	if sender.smtpUsername != "" || sender.smtpPassword != "" {
		smtpAuth = smtp.PlainAuth("", sender.smtpUsername, sender.smtpPassword, host)
	}
	return e.Send(sender.smtpEndpoint, smtpAuth)
}
