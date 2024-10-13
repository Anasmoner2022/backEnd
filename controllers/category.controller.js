const Category = require("../models/category");
const mongoose = require("mongoose");

function getAllCategories(req, res) {
  Category.find({})
    .then((categories) => {
      if (!categories) {
        res.status(404).json({
          message: "No Ctegories Yet",
          method: "GET",
          statusCode: "404",
        });
      } else {
        res.status(200).json({
          message: "Categories Retrieved Successfully",
          method: "GET",
          url: "http://localhost:5000/categories",
          statusCode: "200",
          categories: categories,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function getCategoryById(req, res) {
  const id = req.params.id;
  Category.findById(id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          message: "Category Not Found",
        });
      }
      res.status(200).json({
        message: "Category Retrieved Successfully",
        category: category,
      });
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Category ID" });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    });
}

function storeCategory(req, res) {
  const { categoryName, description } = req.body;

  const newCategory = new Category({
    categoryName,
    description,
  });

  newCategory
    .save()
    .then((category) => {
      res.status(201).json({
        message: "Category Created Successfully",
        url: "http://localhost:5000/categories",
        method: "POST",
        category: category,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

function updateCategory(req, res) {
  const id = req.params.id;
  const updatedData = {
    categoryName: "",
    description: "",
  };

  for (const key in updatedData) {
    updatedData[key] = req.body[key];
  }

  Category.findByIdAndUpdate(id, updatedData, { new: true })
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          message: "Category Not Found",
        });
      }
      res.status(200).json({
        message: "Category Updated Successfully",
        category: category,
      });
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Category ID" });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    });
}

function deleteCategory(req, res) {
  const id = req.params.id;

  Category.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Category Not Found",
        });
      }
      res.status(200).json({
        message: "Category Deleted Successfully",
        deleteCategory: result,
      });
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Category ID" });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    });
}

module.exports = {
  getCategoryById,
  getAllCategories,
  storeCategory,
  updateCategory,
  deleteCategory,
};
