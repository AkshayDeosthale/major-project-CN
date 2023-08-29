import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();

const port = 6000;

app.use("/posts", require("./Routes/posts"));

async function DBCONNECT() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected To MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
    return;
  }
}

app.listen(port, () => {
  DBCONNECT();
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
