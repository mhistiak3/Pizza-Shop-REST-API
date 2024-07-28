import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, default: "customer" },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema, "users");
