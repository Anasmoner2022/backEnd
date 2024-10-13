const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
	{
		categoryName: String,
		description: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Category", CategorySchema);
