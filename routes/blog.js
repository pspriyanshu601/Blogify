import express from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/blog.js";

const blogRouter = express.Router();
let url="";

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
  return res.render("blog.ejs", {
    user: req.user,
    blog,
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
  return res.redirect(`/uploads/${url}`);
});

export default blogRouter;
