const express = require("express"),
router = express.Router(),
CategoryController =require('../controllers/category.controller');

router.post('/', CategoryController.storeCategory);
router.get('/', CategoryController.getAllCategories);
router.get('/:id',CategoryController.getCategoryById);
router.put('/:id',CategoryController.updateCategory);
router.delete('/:id',CategoryController.deleteCategory);

module.exports = router;
