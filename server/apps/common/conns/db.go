package conns

import (
	"fmt"

	"github.com/aksiomo/oasis/server/apps/common/configs"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var (
		dsn string
		err error
		db  *gorm.DB
	)
	config := configs.Cfg

	switch config.DBConfig.DBType {
	case "mysql":
		panic("unsupported database type")
	case "postgres":
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable TimeZone=%s", config.DBConfig.Host, config.DBConfig.User, config.DBConfig.Password, config.DBConfig.Name, config.DBConfig.Port, config.DBConfig.TimeZone)
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	default:
		panic("unsupported database type")
	}

	if err != nil {
		panic(err)
	}
	DB = db
}
