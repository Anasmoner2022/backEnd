const ShippingCost = require("../models/shippingCost"),
  Admin = require("../models/admin");

function index(req, res) {
  ShippingCost.find({})
    .then((results) => {
      if (results.length > 0) {
        return res.status(200).json({
          message: "Shipping costs retrieved successfully!",
          method: req.method,
          url: req.originalUrl,
          total: results.length,
          results: results,
        });
      } else {
        return res.status(404).json({
          message: "No data found!",
          method: req.method,
          url: req.originalUrl,
        });
      }
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

function show(req, res) {
  if (res.shippingCost) {
    return res.status(200).json({
      message: "shipping cost retrieved successfully!",
      method: req.method,
      url: req.originalUrl,
      addedBy: "me :>",
      place: res.shippingCost.place,
      cost: res.shippingCost.cost,
      createdAt: res.shippingCost.createdAt,
      updatedAt: res.shippingCost.updatedAt,
    });
  } else {
    return res.status(404).json({
      message: res.message,
      method: req.method,
      url: req.originalUrl,
    });
  }
}

function store(req, res) {
  const shippingCost = new ShippingCost({
    adminId: req.body.adminId,
    place: req.body.place,
    cost: req.body.cost,
  });

  shippingCost
    .save()
    .then((shippingCost) => {
      return res.status(201).json({
        message: "shipping cost added successfully!",
        method: req.method,
        url: req.originalUrl,
        addedBy: "me :>",
        place: shippingCost.place,
        cost: shippingCost.cost,
      });
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

function update(req, res) {
  if (res.shippingCost) {
    const shippingCost = {
      place: "",
      cost: 0,
    };

    for (const key in shippingCost) {
      if (req.body[key]) {
        shippingCost[key] = req.body[key];
      } else {
        shippingCost[key] = res.shippingCost[key];
      }
    }

    ShippingCost.updateOne(res.shippingCost, shippingCost, { new: true }).then(
      () => {
        res.status(200).json({
          message: "shipping Cost updated successfully!",
          method: req.method,
          url: req.originalUrl,
          addedBy: "me :>",
          place: shippingCost.place,
          cost: shippingCost.cost,
        });
      }
    );
  } else {
    return res.status(404).json({
      message: res.message,
      method: req.method,
      url: req.originalUrl,
    });
  }
}
function destroy(req, res) {
  if (res.shippingCost) {
    ShippingCost.deleteOne(res.shippingCost).then(() => {
      return res.status(200).json({
        message: "shipping cost deleted successfully!",
        method: req.method,
        url: req.originalUrl,
        deletedDate: {
          addedBy: "me :>",
          place: res.shippingCost.place,
          cost: res.shippingCost.cost,
          createdAt: res.shippingCost.createdAt,
          updatedAt: res.shippingCost.updatedAt,
        },
      });
    });
  } else {
    return res.status(404).json({
      message: res.message,
      method: req.method,
      url: req.originalUrl,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
