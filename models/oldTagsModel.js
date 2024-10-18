import { Schema, model } from "mongoose";

const tagsModel = new Schema({
    allTags: {
    type: [String], 
    default: [],
  },
});
  
const TagsModel = model("tags", tagsModel);
  
export default TagsModel;