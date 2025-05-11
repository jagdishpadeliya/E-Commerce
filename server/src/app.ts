import express, { Express } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db";
import productsRouter from "./routes/product.route";
import authRouter from "./routes/auth.routes";
import authMiddleware from "./middleware/authMiddleware";
import rateLimit from "express-rate-limit";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

// Rate limiter to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", authMiddleware, productsRouter);
app.use("/api/auth", authRouter);

export default app;
