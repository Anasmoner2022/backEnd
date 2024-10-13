var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviews = new Schema({

  productId: { 
    type: Schema.Types.ObjectId,
    ref:"Product",
    required: true,
    immutable: true
  },

  customerId: {
    
    type: Schema.Types.ObjectId,
    ref:"User",
    required: false,
  immutable: true
  },


  rating: { type: Number, required: true },

  comment: {  type: String },
},
{ timestamps: true }

);

module.exports= mongoose.model('Review', reviews);