import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();

const port = 3000;

//middlewares
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(cookieParser());

app.use("/users", require("./Routes/users"));

app.use("/posts", require("./Routes/posts"));

async function DBCONNECT() {
  return await mongoose.connect(process.env.MONGODB_URL as string);
}

app.listen(port, () => {
  try {
    DBCONNECT();
    console.log("Connected To MongoDB");
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.log("Error connecting to MongoDB");
    return;
  }
});
