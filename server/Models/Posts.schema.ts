import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  title: { type: String, required: true },
  interestType: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  likes: { type: Number },
  comments: [
    {
      id: String,
      comment: String,
    },
  ],
});

const POST = mongoose.model("POST", postSchema);

module.exports = POST;
