import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
const { Server } = require("socket.io");

//used for session cookie and auth
import session from "express-session";
import chatSockets from "./Config/chat_sockets";
const passport = require("passport");

dotenv.config();
const LocalStrategy = require("./Config/passport-local-strategy");
const GooglStrategy = require("./Config/passport-google-oauth-strategy");

const app: Express = express();
app.use(cors({ origin: true, credentials: true }));
//socket
const chatServer = require("http").Server(app);
chatSockets(chatServer);
chatServer.listen(5001);
console.log("chat server is sitening on 5001");

const port = 3000;

//middlewares

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

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/users", require("./Routes/users"));

app.use("/posts", require("./Routes/posts"));

app.use("/comments", require("./Routes/comments"));

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
