import express from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

const blogRouter = express.Router();
let url = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    url = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

blogRouter.post("/comment/:blogId", async (req, res) => {
  console.log(req.body);
  const comment = await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user.id,
  });
  return res.redirect(`/blog/${req.params.blogId}`)
});

blogRouter.get("/addNew", (req, res) => {
  try {
    return res.render("addBlog", {
      user: req.user,
    });
  } catch (error) {
    console.log("error :", error);
  }
});
blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
  console.log(blog);
  return res.render("blog.ejs", {
    user: req.user,
    blog,
    comments
  });
});

blogRouter.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user.id,
    coverImageURL: `/uploads/${url}`,
  });
  console.log(req.user);
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

export default blogRouter;
