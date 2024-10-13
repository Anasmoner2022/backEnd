const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponCodeSchema = new Schema({
  couponCodeName: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  discountStatus: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

couponCodeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
