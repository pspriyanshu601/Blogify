import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

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
        password
    })
});

export default userRouter;