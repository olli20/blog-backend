import express from "express";
import { getAllTags, createTag } from "../controllers/tagsControllers.js";

const tagsRouter = express.Router();

tagsRouter.route("/").get(getAllTags);

tagsRouter.route("/newTag").post(createTag);

export default tagsRouter;