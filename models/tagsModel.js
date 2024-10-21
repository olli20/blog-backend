import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true,
    unique: true, 
  },
}, { versionKey: false });

const TagsModel = model("tags", tagSchema);

export default TagsModel;
