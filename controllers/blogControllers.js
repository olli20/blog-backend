import PostModel from "../models/postModel.js";

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await PostModel.find();
  res.status(200).json({
    status: 'success',
    results: posts.length,
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
