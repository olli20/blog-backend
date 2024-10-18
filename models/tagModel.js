import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true,
    unique: true, 
  },
}, { versionKey: false });

const TagModel = model("tags", tagSchema);

export default TagModel;