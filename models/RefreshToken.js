import mongoose from "mongoose";
const RefreshToken = mongoose.Schema(
  {
    token: { type: String, unique: true },
  },
  { timestamps: false }
);

export default mongoose.model("RefreshToken", RefreshToken, "refreshtokens");
