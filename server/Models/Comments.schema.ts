import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    //comment belongs to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "POST",
    },
  },
  {
    timestamps: true,
  }
);

const COMMENT = mongoose.model("COMMENT", commentSchema);

export default COMMENT;
