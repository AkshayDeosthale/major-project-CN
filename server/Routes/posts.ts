import express, { NextFunction, Request, Response } from "express";
import { birdFunction } from "../Controllers/Posts.controller";
const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req: Request, res: Response) => {
  birdFunction();
  res.send("Birds home page");
});

module.exports = router;
