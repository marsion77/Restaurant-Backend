const categoryService = require("../Services/categoryService");

exports.createCategory = async (req, res) => {
  try {
    const data = await categoryService.createCategory(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const data = await categoryService.getAllCategories();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const data = await categoryService.getCategoryById(req.params.id);
    if (!data) return res.status(404).json({ error: "Category not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
