import { Schema, model } from "mongoose";

const postModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tags',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  gallery: [
    {
      source: { type: String, required: true },
      title: { type: String, required: true },
      alt: { type: String, required: true },
    },
  ],
});

const PostModel = model("post", postModel);

export default PostModel;