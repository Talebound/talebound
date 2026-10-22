package token

import (
	"github.com/stretchr/testify/require"
	"github.com/the-medo/talebound-backend/util"
	"testing"
	"time"
)

func TestPasetoMaker(t *testing.T) {
	maker, err := NewPasetoMaker(util.RandomString(32))
	require.NoError(t, err)

	userId := util.RandomUserId()
	duration := time.Minute

	issuedAt := time.Now()
	expiredAt := issuedAt.Add(duration)

	token, payload, err := maker.CreateToken(userId, duration)
	require.NoError(t, err)
	require.NotEmpty(t, token)
	require.NotEmpty(t, payload)

	payload, err = maker.VerifyToken(token)
	require.NoError(t, err)
	require.NotEmpty(t, payload)

	require.Equal(t, userId, payload.UserId)
	require.WithinDuration(t, issuedAt, payload.IssuedAt, time.Second)
	require.WithinDuration(t, expiredAt, payload.ExpiredAt, time.Second)
}

func TestExpiredPasetoToken(t *testing.T) {
	maker, err := NewPasetoMaker(util.RandomString(32))
	require.NoError(t, err)

	token, payload, err := maker.CreateToken(util.RandomUserId(), -time.Minute)
	require.NoError(t, err)
	require.NotEmpty(t, token)
	require.NotEmpty(t, payload)

	payload, err = maker.VerifyToken(token)
	require.Error(t, err)
	require.EqualError(t, err, ErrExpiredToken.Error())
	require.Nil(t, payload)
}

func TestPasetoMakerAcceptsLegacyToken(t *testing.T) {
	// Minted with github.com/o1egl/paseto v1.0.0 before the module upgrade.
	// This is a public test key, not an application signing key.
	const key = "01234567890123456789012345678901"
	const legacyToken = "v2.local.n7h92dHSbTKbBK4RGWv8lab1yiE9dfHzR-0f-HavnMzO0_AcPsgNVYktaglTe_oZyi7R6esNm49a1MBbcuncjj3BP9yE_fTWML2D2OFE6Eg9Cfd-DQiJJt-suL96VWDAIFs3eDKdAkKPaM7qsbIfhjB-vlzkroCiBnm6TGLOW1ooI3KrWDCpaZxOsvE3zv-WxAIqfkS07yXH57E5ylR3z2r0TWOiqKQGqw.bnVsbA"

	maker, err := NewPasetoMaker(key)
	require.NoError(t, err)
	payload, err := maker.VerifyToken(legacyToken)
	require.NoError(t, err)
	require.Equal(t, "0d478caa-3372-4ada-b96b-0dcd8272034b", payload.ID.String())
	require.Equal(t, int32(42), payload.UserId)
	require.Equal(t, time.Date(2026, 10, 22, 0, 0, 0, 0, time.UTC), payload.IssuedAt)
	require.Equal(t, time.Date(2100, 1, 1, 0, 0, 0, 0, time.UTC), payload.ExpiredAt)
}
