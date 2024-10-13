const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

// Add item to cart
router.post("/create", cartController.addToCart);

// Update cart item
router.put("/:cartId", cartController.updateCart);

// Remove item from cart by productId and userId
router.delete("/:productId/:userId", cartController.removeFromCart);

// Get all cart items for a specific user
router.get("/:userId", cartController.getCart);

// Clear entire cart for a specific user
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;
