import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },

    password: { type: String, required: [true, "Password is required"] },
    interests: [String],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  },
  { timestamps: true }
);

const USER = mongoose.model("USER", userSchema);

export default USER;
