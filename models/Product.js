import mongoose from "mongoose";
import { APP_URL } from "../config";
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    size: { type: String, require: true },
    image: {
      type: String,
      require: true,
      get: (image) => {
        return `${APP_URL}/${image}`;
      },
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

export default mongoose.model("Product", ProductSchema, "products");
