import express from "express";
import { clerkMiddleware } from "@clerk/express";

const app = express();

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.json({
    message: "API running fine",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
