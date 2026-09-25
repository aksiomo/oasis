package model

import "time"

type TaskStatus struct {
	BaseModel
	Title          string
	Description    string
	Color          string
	NextStatus     *TaskStatus
	PreviousStatus *TaskStatus
}

type TaskComment struct {
	BaseModel
	Content string
	Task    *Task
	Status  *TaskStatus
	User    *User
}

type Task struct {
	BaseModel
	Title       string
	Description string
	Status      TaskStatus
	DueDate     time.Time
	CreatedBy   string
	AssignedTo  string
	AssignedAt  time.Time
	Comments    []TaskComment
}
