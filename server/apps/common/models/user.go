package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Nick      string
	Email     string
	Phone     string
	Password  string
	Birthday  *time.Time
	Available bool
}

type UserRole struct {
	UserID uint
	RoleID uint
	User   User
	Role   Role
}

type UserTOPTSecret struct {
	gorm.Model
	UserID     uint
	User       User
	Secret     string
	Enabled    bool
	VerifiedAt *time.Time
}

type UserTOPTSecretRevCode struct {
	gorm.Model
	UserID           uint
	User             User
	UserTOPTSecretID uint
	UserTOPTSecret   UserTOPTSecret
	RecoveryCode     string
	Enabled          bool
	UsedAt           *time.Time
}
