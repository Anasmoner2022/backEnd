const express = require("express");
const app = express();
const cartRoutes = require("./routes/carts.routes");
const mongoose = require("mongoose");
require("dotenv").config();

//database connection
mongoose.connect(process.env.DB_URL);
const conn = mongoose.connection;
conn.once("open", () =>
  console.log(`Database Connected Successfully At Link ${process.env.DB_URL}`)
);
conn.on("error", (err) => console.log("connection failed"));

// middlewares
app.use(express.json());

//routing
app.use("/admin", require("./routes/admins.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/cart", cartRoutes);
app.use("/coupon", require("./routes/coupon.routes"));
app.use("/order", require("./routes/order.routes"));
app.use("/shippingCost", require("./routes/shippingCost.routes"));
app.use("/products", require("./routes/product.routes"));
app.use("/categories", require("./routes/category.routes"));
app.use("/reviews", require("./routes/review.routes"));

module.exports = app;
