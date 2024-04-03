import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/db.js";
import path from "path";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import checkForAuthenticationCookie from "./middlewares/authentication.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(cookieParser());

app.use(checkForAuthenticationCookie("token"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", {
    user:req.user,
  });
});

app.use("/user", userRouter);

// Start the server
app.listen(port);
