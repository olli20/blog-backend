import express from "express";
import { getAllTags } from "../controllers/tagsControllers.js";

const tagsRouter = express.Router();

tagsRouter.route("/").get(getAllTags);

export default tagsRouter;