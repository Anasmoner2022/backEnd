
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var products = new Schema(
  {
     sku: { type: String, required: true },

     title: { type: String, required: true },

      price: {
      base: { type: Number, required: true },
      discount: { type: Number, default: 0 },
    },

    description: { type: String },

    images: [ {type: String,required: true, }, ],

    categoryId: { type: Schema.Types.ObjectId, required: false },

    quantity: { type: Number, required: true, default: 1},

    options: { vitamins: [ { type: String} ],
      size: [{ type: String}],
      scent: [{type: String}] ,
      gender: [{ type: String}],
    },


    tags: [{ type: String }],


    rating: { type: Number,default: 0 },


    status: { type: String, required: true},

    createdBy: { type: Schema.Types.ObjectId, required: false},
  },



  { timestamps: true }
);

module.exports = mongoose.model('Product', products);