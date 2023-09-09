import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "USER", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "USER", required: true },
    title: { type: String, required: true },
    interestType: { type: String, required: true },
    description: { type: String, required: true },

    likes: { type: Number },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "COMMENT" }],
  },
  {
    timestamps: true,
  }
);

const POST = mongoose.model("POST", postSchema);

export default POST;
