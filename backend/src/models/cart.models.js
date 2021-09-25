import mongoose from "mongoose";

import { productSchema } from "./product.model.js";

const cartSchema = new mongoose.Schema(
  {
    products: [productSchema],
  },
  {
    timestamps: true,
  }
);

export const cartModel = mongoose.model("Cart", cartSchema);
