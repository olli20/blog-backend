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
  }
});

const PostModel = model("post", postModel);

export default PostModel;