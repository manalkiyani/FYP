const express = require("express");
const {
  addCategory,
  deleteCategory,
  updateCategory,
  getListOfCategories,
  getCategories,
} = require("../controllers/categories.controller");
const router = express.Router();

router.post("/", addCategory);
router.get("/", getCategories);

router.patch("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);

module.exports = router;
