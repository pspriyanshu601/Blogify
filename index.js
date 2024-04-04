import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/db.js";
import path from "path";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import checkForAuthenticationCookie from "./middlewares/authentication.js";
import blogRouter from "./routes/blog.js";
import Blog from "./models/blog.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.use(checkForAuthenticationCookie("token"));

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort("createdAt");

  res.render("home", {
    user: req.user,
    blogs:allBlogs
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

// Start the server
app.listen(port);
