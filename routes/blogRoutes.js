import express from 'express';
import { getAllPosts, getPostById, createPost } from '../controllers/blogControllers.js';
import upload from '../middlewares/postsMiddlewares.js';

const blogRouter = express.Router();

blogRouter.route('/')
  .get(getAllPosts)
  .post(upload.array('gallery', 5), createPost); 

blogRouter.route('/:id').get(getPostById);

export default blogRouter;