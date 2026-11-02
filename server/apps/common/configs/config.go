package configs

import (
	"os"

	"github.com/pelletier/go-toml/v2"
)

type DBConfig struct {
	DBType   string `toml:"db_type"`
	Host     string `toml:"host"`
	Port     int32  `toml:"port"`
	User     string `toml:"user"`
	Password string `toml:"password"`
	MaxConn  int32  `toml:"max_conn"`
}

type MQConfig struct {
	Host     string `toml:"host"`
	Port     int32  `toml:"port"`
	User     string `toml:"user"`
	Password string `toml:"password"`
}

type RedisConfig struct {
	Host     string `toml:"host"`
	Port     int32  `toml:"port"`
	User     string `toml:"user"`
	Password string `toml:"password"`
}

type SeedConfig struct {
	User     string `toml:"user"`
	Password string `toml:"password"`
}

type ConfigProvider struct {
	Version     string      `toml:"version"`
	DBConfig    DBConfig    `toml:"db"`
	MQConfig    MQConfig    `toml:"mq"`
	RedisConfig RedisConfig `toml:"redis"`
	SeedConfig  SeedConfig  `toml:"seed"`
}

var Cfg ConfigProvider

func InitConfig() {
	cfgDoc, err := os.ReadFile("./configs/base.config.toml")
	if err != nil {
		panic(err)
	}
	err = toml.Unmarshal([]byte(cfgDoc), &Cfg)
	if err != nil {
		panic(err)
	}
}
