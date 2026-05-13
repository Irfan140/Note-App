import app from "./app";
import dotenv from "dotenv"

// for correctly loading .env files in development and production environments
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

const PORT = parseInt(process.env.PORT ?? "3000", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
