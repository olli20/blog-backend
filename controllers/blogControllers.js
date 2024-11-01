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
  const { title, content, imageMetadata = [] } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      status: 'fail',
      message: 'Title and content are required',
    });
  }

  let tags = req.body.tags;

  if (typeof tags === 'string') {
    tags = tags.includes(',') ? tags.split(',') : [tags];
  }

  tags = tags.map(tag => new mongoose.Types.ObjectId(String(tag)));

  if (tags && tags.length > 0) {
    const existingTags = await TagsModel.find({ _id: { $in: tags } });
    const existingTagIds = existingTags.map(tag => tag._id.toString());

    const invalidTags = tags.filter(tag => !existingTagIds.includes(tag.toString()));

    if (invalidTags.length > 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'One or more selected tags do not exist',
      });
    }
  }

  const gallery = req.files.map((file, index) => ({
    source: file.path, 
    title: imageMetadata[index]?.title || title,
    alt: imageMetadata[index]?.alt || `Image of ${title}`,
  }));

  const newPost = await PostModel.create({
    title,
    content,
    tags,
    gallery,
  });

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});