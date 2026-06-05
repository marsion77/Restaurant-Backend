const express = require("express")
const router = express.Router()
const menuController = require("../Controller/menuController")

router.post("/create", menuController.createMenu)
router.get("/all", menuController.getAllMenus)

module.exports = router
