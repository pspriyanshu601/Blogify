import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.DATABASE_URL;

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

export default db;
