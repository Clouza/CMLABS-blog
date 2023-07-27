package model

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DBUsername string
var DBPassword string
var DBPort string
var DBName string

var DB *gorm.DB

func Connection() {
	setVariableByEnv() // set variables by env file

	credentials := fmt.Sprintf("%s:%s@tcp(localhost:%s)/%s", DBUsername, DBPassword, DBPort, DBName)
	db, err := gorm.Open(mysql.Open(credentials), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	db.AutoMigrate(Blog{})
	DB = db
}

func setVariableByEnv() {
	if err := godotenv.Load("../.env"); err != nil {
		log.Panic(".env file not found")
	}

	DBUsername = os.Getenv("DB_username")
	DBPassword = os.Getenv("DB_password")
	DBPort = os.Getenv("DB_port")
	DBName = os.Getenv("DB_name")
}
