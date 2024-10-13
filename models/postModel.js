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
  tags: {
    type: [String], 
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  previousPostId: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    default: null,
  },
  nextPostId: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    default: null,
  }
});

const PostModel = model("post", postModel);

export default PostModel;