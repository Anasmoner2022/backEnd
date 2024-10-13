var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var order = new Schema({

  customerId: 
  {
    type: Schema.Types.ObjectId,
    required: true
  },
  paymentId:
   {
    type: Schema.Types.ObjectId,
    required: true
  },
  cartId: 
  {
    type: Schema.Types.ObjectId,
    required: true
  },
  status: 
  {
    type: String,
    required: true
  },
  currency: 
  {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    },
    required: true
  }],
  shipping:
   {
    address: {
      street1: {
        type: String,
        required: true
      },
      street2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zip: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      required: true
    },
    carrier: {
      type: String
    },
    tracking: {
      type: String
    },
    required: true
  },

  createdAt: 
  {
    type: Date,
    required: true
  },
  updatedAt:
   {
    type: Date,
    required: true
  }
});

module.exports= mongoose.model('Order', order);