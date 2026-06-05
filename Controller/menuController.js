const menuService = require("../Services/menuServices")

const createMenu = async (req, res) => {
  try {
    const data = await menuService.createMenu(req.body)
    res.status(201).json({ success: true, data })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllMenus = async (req, res) => {
  try {
    const data = await menuService.getAllMenus()
    res.json({ success: true, data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createMenu, getAllMenus }
