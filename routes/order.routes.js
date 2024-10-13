const express=require('express'),
router = express.Router(),
orderController=require('../controllers/order.controller');
router.post('/', orderController.createOrder)
router.put('/:id', orderController.updateOrder)
router.get('/:id', orderController.getSingleOrder)
router.get('/', orderController.getAllOrders)

// router.delete('/:id', orderController.cancelOrder)
// router.get('/filter', orderController.filterOrder)
// router.get('/sort',orderController.sortByDate)


module.exports=router;