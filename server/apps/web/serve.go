// This file is web server entry point
package web

import (
	"github.com/aksiomo/oasis/server/apps/web/handler"
	"github.com/gin-gonic/gin"
)

func Serve() *gin.Engine {
	r := gin.Default()

	AddRoutes(r)

	return r
}

func AddRoutes(r *gin.Engine) {
	v1 := r.Group("/v1")
	handler.AddUserHandler(v1)
}
