import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/signin", (req, res) => {
    return res.render("signin.ejs");
})

userRouter.get("/signup", (req, res) => {
  return res.render("signup.ejs");
});

userRouter.post("/signup", async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide fullName, email, and password" });
  }
  await User.create({
    fullName,
    email,
    password,
  });
    return res.redirect("/");
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPassword(email, password);
    console.log(token);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("signin", {
      error: "incorrect email or password",
    });
  }
});

userRouter.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

export default userRouter;
