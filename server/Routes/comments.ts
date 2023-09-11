import express, { Request, Response } from "express";
import {
  CreateComment,
  GetAllComments,
} from "../Controllers/Comments.controller";
const router = express.Router();

// define the home page route

router.post("/create/:id", async (req: Request, res: Response) => {
  console.log(req.params);

  const response = await CreateComment(req.body, req.params.id);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});
router.get("/all", async (req: Request, res: Response) => {
  const response = await GetAllComments();
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});

module.exports = router;
