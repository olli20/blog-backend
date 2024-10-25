import PostModel from "../models/postModel.js";
import TagsModel from "../models/tagsModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import mongoose from 'mongoose';

export const getAllPosts = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 7;
  const skip = (page - 1) * limit;
  const tag = req.query.tag;

  console.log("Received query parameters:", { page, limit, tag });

  let query = {};

  if (tag) {
    if (!mongoose.Types.ObjectId.isValid(tag)) {
      console.error("Invalid tag ID:", tag);
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid tag ID',
      });
    }
    query.tags = tag;
  }

  const posts = await PostModel.find(query)
    .skip(skip)
    .limit(limit)
    .populate('tags', 'tagName')
    .lean();

  const totalPosts = await PostModel.countDocuments(query);
  const totalPages = Math.ceil(totalPosts / limit);

  console.log("Posts fetched back:", posts);

  res.status(200).json({
    status: 'success',
    results: posts.length,
    totalPosts,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    data: {
      posts,
    },
  });
});

export const getPostById = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  console.log(postId);

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid post ID',
    });
  }

  const post = await PostModel.findById(postId).populate('tags', 'tagName');

  
  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: 'Post not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

export const createPost = catchAsync(async (req, res, next) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title and content are required',
    });
  }

  if (tags && tags.length > 0) {
    const invalidTags = tags.filter(tag => !mongoose.Types.ObjectId.isValid(tag));
    if (invalidTags.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'One or more tag IDs are invalid',
      });
    }

    const validTags = await TagsModel.find({ _id: { $in: tags } });

    if (validTags.length !== tags.length) {
      return res.status(400).json({
        status: 'fail',
        message: 'Some tags are not found in the database',
      });
    }
  }

  const newPost = await PostModel.create({
    title,
    content,
    tags,
  });

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});
