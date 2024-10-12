import TagsModel from "../models/tagsModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllTags = catchAsync(async (req, res, next) => {
    const tags = await TagsModel.find();
    res.status(200).json({
      status: 'success',
      data: {
        tags,
      },
    });
  });