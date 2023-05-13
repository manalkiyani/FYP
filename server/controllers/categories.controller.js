const mongoose = require("mongoose");

const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

//categories management
const addCategory = async (req, res) => {
  const { name, description, image } = req.body;
  try {
    const category = new Category({
      name,
      description,
      image,
    });
    await category.save();
    res.status(201).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  console.log("req.params", req.params);
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.remove();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const { name, description, image } = req.body;
    category.name = name;
    category.description = description;
    category.image = image;
    await category.save();
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getListOfCategories = async (req, res) => {
  console.log("Req.body", req.body.categoryIds);

  //find blogs which have ids in the array
  Product.find({ id: { $in: req.body.categoryIds } })

    .then((allCategories) => {
      return res.status(200).json({
        success: true,
        message: "A list of all categories",
        Categories: allCategories,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
  getListOfCategories,
  getCategories,
};
