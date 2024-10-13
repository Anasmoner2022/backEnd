const Product = require("../models/product");
const mongoose = require("mongoose");

function storeProduct(req, res) {
  const product = new Product({
    sku: req.body.sku,
    title: req.body.title,
    price: {
      base: req.body.price.base,
      discount: req.body.price.discount,
    },
    description: req.body.description,
    images: req.body.images,
    categoryId: req.body.categoryId,
    quantity: req.body.quantity,
    options: {
      vitamins: req.body.options.vitamins || [],
      size: req.body.options.size || [],
      scent: req.body.options.scent || [],
      gender: req.body.options.gender || [],
    },
    tags: req.body.tags || [],
    rating: req.body.rating,
    status: req.body.status,
    createdBy: req.body.createdBy,
  });

  product
    .save()
    .then((product) => {
      res.status(201).json({
        message: "Product Created Successfully",
        method: "POST",
        url: "http://localhost:5000/products",
        createdProduct: product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

function getProductById(req, res) {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }
      res.status(200).json({
        message: "Product Retrieved Successfully",
        product: product,
      });
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    });
}

function getAllProducts(req, res) {
  Product.find({})
    // .select('title _id')
    .then((products) => {
      if (!products) {
        res.status(404).json({
          message: "No Products Yet",
          method: "GET",
          statusCode: "404",
        });
      } else {
        res.status(200).json({
          message: "Products Retrieved Successfully",
          method: "GET",
          url: "http://localhost:5000/products",
          statusCode: "200",
          products: products,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

function updateProduct(req, res) {
  const id = req.params.id;

  const updatedData = {
    sku: "",
    title: "",
    price: {
      base: 0,
      discount: 0,
    },
    description: "",
    images: "",
    categoryId: "" || null,
    quantity: 0,
    options: {
      vitamins: "" || [],
      size: "" || [],
      scent: "" || [],
      gender: "" || [],
    },
    tags: "" || [],
    rating: "" || null,
    status: "",
  };

  for (const key in updatedData) {
    updatedData[key] = req.body[key];
  }

  Product.findByIdAndUpdate(id, updatedData, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }
      res.status(200).json({
        message: "Product Updated Successfully",
        product: product,
      });
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    });
}

function deleteProduct(req, res) {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }
      res.status(200).json({
        message: "Product Deleted Successfully",
        deleteProduct: result,
      });
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Product ID" });
      } else {
        res.status(500).json({
          error: err,
        });
      }
    });
}

module.exports = {
  storeProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
};
