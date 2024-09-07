import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import questionRoutes from "./routes/questionRoutes.js";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use question routes
app.use("/api/questions", questionRoutes);

export default app;
