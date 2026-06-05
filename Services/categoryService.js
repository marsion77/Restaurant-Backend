const Category = require("../Model/categoryModel");

exports.createCategory = async (body) => {
  const category = new Category(body);
  return await category.save();
};

exports.getAllCategories = async () => {
  return await Category.find();  // Returns all 4 categories [web:25]
};

exports.getCategoryById = async (id) => {
  return await Category.findById(id);
};

exports.updateCategory = async (id, body) => {
  return await Category.findByIdAndUpdate(id, body, { new: true });
};

exports.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};
