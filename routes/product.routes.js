const express = require('express'),
router = express.Router(),
ProductController =require('../controllers/product.controller');

router.post('/', ProductController.storeProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductById)
router.put('/:id', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)



module.exports = router;






