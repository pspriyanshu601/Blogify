import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/db.js";
import path from "path";
import userRouter from "./routes/user.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy, no worries!",
  });
});

app.use("/auth", userRouter);

// Start the server
app.listen(port);
