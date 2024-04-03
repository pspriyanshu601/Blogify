import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy, no worries!",
  });
});

// Start the server
app.listen(port);
