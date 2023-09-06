import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";

//used for session cookie and auth
import session from "express-session";
const passport = require("passport");
const LocalStrategy = require("./Config/passport-local-strategy");

dotenv.config();

const app: Express = express();

const port = 3000;

//middlewares
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    name: "quoraSession",
    secret: "Akshay Is Great",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", require("./Routes/users"));

app.use("/posts", require("./Routes/posts"));

async function DBCONNECT() {
  const dbName = "QUORA_CLONE";
  const dbUrl = `${process.env.MONGODB_URL as string}/${dbName}`;
  return await mongoose.connect(dbUrl);
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
