import express from "express";
import { getAllPosts, getPostById } from "../controllers/blogControllers.js";

const blogRouter = express.Router();

blogRouter.route("/").get(getAllPosts);

blogRouter.route("/:id").get(getPostById);

export default blogRouter;
