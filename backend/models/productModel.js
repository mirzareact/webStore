import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  images: [String],
  sizes: [{ name: String, inStock: Boolean }],
  description: String,
});

export const Product = mongoose.model("Product", productSchema);
