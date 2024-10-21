import express from "express";
import { getAllPosts, createPost, getPostById } from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.route("/").get(getAllPosts).post(createPost);

blogRouter.route("/:id").post(getPostById);

export default blogRouter;