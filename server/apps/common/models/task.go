package models

import (
	"time"

	"gorm.io/gorm"
)

type TaskStatus struct {
	gorm.Model
	Title  string
	Desc   *string
	Color  string
	PrevId uint
	Prev   *TaskStatus   `gorm:"foreignKey:PrevId"`
	Nexts  []*TaskStatus `gorm:"foreignKey:PrevId"`
}

type TaskComment struct {
	gorm.Model
	Content      string
	TaskID       uint
	Task         Task
	TaskStatusID uint
	TaskStatus   TaskStatus
	UserID       uint
	User         User
}

type Task struct {
	gorm.Model
	Title          string
	Desc           *string
	TaskStatusID   uint
	TaskStatus     TaskStatus
	DueDate        *time.Time
	CreatedBy      uint
	CreatedByUser  User `gorm:"foreignKey:CreatedBy"`
	AssignedTo     uint
	AssignedToUser User `gorm:"foreignKey:AssignedTo"`
	AssignedAt     *time.Time
	TaskComments   []*TaskComment `gorm:"foreignKey:TaskID"`
}
