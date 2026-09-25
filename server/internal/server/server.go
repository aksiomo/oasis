package server

import (
	"github.com/aksiomo/oasis/server/internal/config"
	"github.com/gin-gonic/gin"
)

type Server struct {
	Engine *gin.Engine
}

func NewServer(cfg config.Config) *Server {
	engine := gin.New()

	engine.Use(gin.Logger())

	engine.Use(gin.Recovery())

	gin.SetMode(cfg.HTTP.Mode)

	return &Server{
		Engine: engine,
	}
}
