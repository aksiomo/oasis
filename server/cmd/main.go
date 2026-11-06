package main

import "github.com/aksiomo/oasis/server/apps/web"

func main() {
	r := web.Serve()
	r.Run(":8080")
}
