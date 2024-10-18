import TagModel from "../models/tagModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllTags = catchAsync(async (req, res, next) => {
  const tags = await TagModel.find();
  res.status(200).json({
    status: 'success',
    data: {
      tags,
    },
  });
});

// Function to create a new tag
export const createTag = catchAsync(async (req, res, next) => {
  const { tagName } = req.body;

  const newTag = await TagModel.create({ tagName });
  res.status(201).json({
    status: 'success',
    data: {
      tag: newTag,
    },
  });
});