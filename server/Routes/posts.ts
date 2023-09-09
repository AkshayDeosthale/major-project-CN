import express, { Request, Response } from "express";
import { CreatePost, GetAllPosts } from "../Controllers/Posts.controller";
const router = express.Router();
const PostController = require("../Controllers/Posts.controller");

// define the home page route

router.post("/create", async (req: Request, res: Response) => {
  const response = await CreatePost(req.body);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});
router.get("/all", async (req: Request, res: Response) => {
  const response = await GetAllPosts();
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});

module.exports = router;
