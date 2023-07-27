package main

import (
	"blog.dev/pkgs/internal/controller"
	"blog.dev/pkgs/internal/model"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	model.Connection() // connect to MySQL database

	app := fiber.New()

	// cors
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
	}))

	api := app.Group("/api")
	v1 := api.Group("/v1")

	v1.Get("/validate-key", controller.ValidateKey)
	v1.Get("/records", controller.GetRecords)
	v1.Post("/record", controller.CreateRecord)

	v1.Get("/record/:slug", controller.GetRecord)
	v1.Put("/record", controller.Upsert)
	v1.Delete("/record/:slug", controller.DeleteRecord)

	app.Listen(":8000")
}
