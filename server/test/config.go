package main

import (
	"github.com/aksiomo/oasis/server/apps/common/configs"
)

func main() {
	configs.InitConfig()
	Cfg := configs.Cfg
	println("db_type: ", Cfg.DBConfig.DBType)
}
