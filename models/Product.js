import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    size: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema, "products");
