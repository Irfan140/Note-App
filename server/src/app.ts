import express from "express";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API hit",
  });
});

export default app;
