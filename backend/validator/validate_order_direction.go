package validator

import (
	"fmt"
	"strings"
)

func ValidateOrderDirection(value string) error {
	if direction := strings.ToUpper(value); direction != "ASC" && direction != "DESC" {
		return fmt.Errorf("sort direction must be asc or desc")
	}
	return nil
}
