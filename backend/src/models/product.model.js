import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const productModel = mongoose.model("Product", productSchema);
