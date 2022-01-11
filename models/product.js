const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required."],
  },
  price: {
    type: Number,
    required: [true, "product price is required"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

const product = mongoose.model("products", productSchema);

module.exports = product;
