package controller

import (
	"log"
	"os"

	"blog.dev/pkgs/internal/model"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func ValidateKey(c *fiber.Ctx) error {
	key := c.Query("key")
	if key != os.Getenv("API_KEY") {
		return c.SendStatus(fiber.StatusNotAcceptable)
	}

	return c.SendStatus(fiber.StatusOK)
}

func GetRecords(c *fiber.Ctx) error {
	var blog []model.Blog
	model.DB.Find(&blog)
	return c.JSON(&blog)
}

func CreateRecord(c *fiber.Ctx) error {
	var blog model.Blog
	if err := c.BodyParser(&blog); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"response": "The fields are not valid",
			"code":     "400",
			"log":      err.Error(),
		})
	}

	if err := model.DB.Create(&blog).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"response": "Something went wrong",
			"code":     "500",
			"log":      err.Error(),
		})
	}

	return c.JSON(&blog)
}

func GetRecord(c *fiber.Ctx) error {
	var blog model.Blog
	slug := c.Params("slug")

	err := model.DB.Where("slug = ?", slug).First(&blog).Error
	if err == gorm.ErrRecordNotFound {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"response": "Record not found",
			"code":     "400",
		})
	}

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"response": "Something went wrong",
			"code":     "500",
			"log":      err.Error(),
		})
	}

	return c.JSON(&blog)
}

func UpdateRecord(c *fiber.Ctx) error {
	var blog model.Blog

	if err := c.BodyParser(&blog); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"response": "The fields are not valid",
			"code":     "400",
			"log":      err.Error(),
		})
	}

	rA := model.DB.Save(&blog).RowsAffected

	if rA == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"response": "Record not found, cannot update this record",
			"code":     "404",
		})
	}

	return c.JSON(fiber.Map{"response": "Record has been updated"})
}

func Upsert(c *fiber.Ctx) error {
	var blog model.Blog
	if err := c.BodyParser(&blog); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"response": "The fields are not valid",
			"code":     "400",
			"log":      err.Error(),
		})
	}

	err := model.DB.Save(&blog).Error
	if err != nil {
		log.Print(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"response": "Current record is exists",
			"code":     "400",
		})
	}

	return c.JSON(&blog)
}

func DeleteRecord(c *fiber.Ctx) error {
	var blog model.Blog
	slug := c.Params("slug")

	rA := model.DB.Where("slug = ?", slug).Delete(&blog)
	if rA.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"response": "Record not found, cannot delete this record",
			"code":     "404",
		})
	}

	return c.JSON(fiber.Map{"response": "Record has been deleted"})
}
