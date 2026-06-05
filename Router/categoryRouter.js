const express = require("express");
const router = express.Router();
const categoryController = require("../Controller/categoryController");

router.post("/create", categoryController.createCategory);
router.get("/all", categoryController.getAllCategories);  // Key endpoint for UI [memory:16]
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
