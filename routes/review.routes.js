const express = require('express'),
router = express.Router(),
ReviewController =require('../controllers/review.controller');

router.post('/', ReviewController.storeReview)
router.get('/', ReviewController.getAllReviews)
router.get('/:id', ReviewController.getReviewById)
router.get('/product/:productId', ReviewController.getReviewByProductId)
router.put('/:id', ReviewController.updateReview)
router.delete('/:id', ReviewController.deleteReview)


module.exports = router;


