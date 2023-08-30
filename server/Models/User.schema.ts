import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    interests: [String],
    followers: [String],
  },
  { timestamps: true }
);

const USER = mongoose.model("USER", userSchema);

module.exports = USER;
