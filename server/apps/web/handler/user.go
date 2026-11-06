package handler

import "github.com/gin-gonic/gin"

type UserHandler struct {
}

func (h *UserHandler) GetUser() string {
	return "GetUser"
}

func AddUserHandler(g *gin.RouterGroup) {
	users := g.Group("/users")
	handler := &UserHandler{}
	users.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": handler.GetUser(),
		})
	})
}
