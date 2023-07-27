package model

import "encoding/json"

type Blog struct {
	Id        int             `gorm:"primaryKey" json:"id"`
	Title     string          `gorm:"varchar(52)" json:"title"`
	Slug      string          `gorm:"varchar(52);unique" json:"slug"`
	Body      json.RawMessage `gorm:"json" json:"body"`
	CreatedAt string          `gorm:"string" json:"created_at"`
}

type Subscribers struct {
	Id        int    `gorm:"primaryKey" json:"id"`
	Email     string `gorm:"varchar(52)" json:"email"`
	CreatedAt string `gorm:"string" json:"created_at"`
}
