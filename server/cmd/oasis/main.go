// This is the main package/entrance for the server.

package main

import (
	"log"
	"time"

	"github.com/aksiomo/oasis/server/internal/config"
	"github.com/aksiomo/oasis/server/internal/server"
	"github.com/fvbock/endless"
)

func main() {
	provider, err := config.Load("configs/config.yaml")
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}
	cfg := provider.Config()

	svr := server.NewServer(cfg)

	// TODO: 写进统一的配置文件中
	endless.DefaultReadTimeOut = 60 * time.Second
	endless.DefaultWriteTimeOut = 60 * time.Second
	endless.DefaultMaxHeaderBytes = 1 << 20

	endlessServer := endless.NewServer(cfg.HTTP.Addr, svr.Engine)
	err = endlessServer.ListenAndServe()
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
