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

export const createTag = catchAsync(async (req, res, next) => {
  const { tagName } = req.body;

  if (!tagName || tagName.trim() === "") {
    return res.status(400).json({
      status: 'fail',
      message: 'Tag name cannot be empty.',
    });
  }

  try {
    const newTag = await TagsModel.create({ tagName });
    res.status(201).json({
      status: 'success',
      data: {
        tag: newTag,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tag name already exists.',
      });
    }
    throw error;
  }
});