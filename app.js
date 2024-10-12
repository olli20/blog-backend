import mongoose from 'mongoose';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import blogRouter from "./routes/blogRoutes.js";
import globalErrorHandler from './controllers/errorController.js';

const app = express();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


//ROUTES
app.use("/blog", blogRouter);

// handle not found error
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// handle global error
app.use(globalErrorHandler);

//SERVER
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
})
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
});