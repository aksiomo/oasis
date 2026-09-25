package model

type User struct {
	BaseModel
	Email    string
	Phone    string
	Password string // encrypted
}
