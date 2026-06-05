const Menu = require("../Model/menuModel")

const createMenu = async (body) => {
  const menu = new Menu(body)
  const saved = await menu.save()
  return await saved.populate('category')
}

const getAllMenus = async () => {
  return await Menu.find().populate('category')
}

module.exports = { createMenu, getAllMenus }
