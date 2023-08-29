import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  interests: [String],
  followers: [String],
});

const USER = mongoose.model("USER", userSchema);

module.exports = USER;
