const ShippingCost = require("../models/shippingCost");

function getShippingCostById(req, res, next) {
  const { id } = req.params;
  ShippingCost.findById(id)
    .then((shippingCost) => {
      if (shippingCost) res.shippingCost = shippingCost;
      else res.message = "Shipping cost not found!";
      next();
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server Error! please try again later",
        method: req.method,
        url: req.originalUrl,
        errorCode: err.code,
        errorMessage: err.message,
      });
    });
}

function getShippingCostByPlace(req, res, next) {
  ShippingCost.find({ place: req.body.place })
    .then((shippingCost) => {
      if (shippingCost) res.shippingCost = shippingCost;
      else res.message = "Shipping cost not found!";
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Server error! please try again later.",
        method: req.method,
        url: req.originalUrl,
        "error code": err.code,
        "error message": err.message,
      });
    });
}

module.exports = { getShippingCostById, getShippingCostByPlace };
