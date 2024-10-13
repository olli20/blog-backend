import PostModel from "../models/postModel.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllPosts = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 7;
  const skip = (page - 1) * limit;
  const tag = req.query.tag;

  const query = tag ? { tags: tag } : {};

  const posts = await PostModel.find(query).skip(skip).limit(limit).lean();

  const totalPosts = await PostModel.countDocuments(query);
  
  const totalPages = Math.ceil(totalPosts / limit);

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
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    return next(new Error('Post not found'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});
