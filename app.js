import mongoose from 'mongoose';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

import blogRouter from "./routes/blogRoutes.js";
import tagsRouter from './routes/tagsRoutes.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//ROUTES
app.use("/api/blog", blogRouter);
app.use("/api/tags", tagsRouter);

// handle not found error
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// handle global error
app.use(globalErrorHandler);

if (!DB_HOST) {
  process.exit(1);
}

//SERVER
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });