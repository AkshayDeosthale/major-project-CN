import express, { NextFunction, Request, Response } from "express";
import { RegisterUserService } from "../Controllers/Users.controller";
const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.post("/register", (req: Request, res: Response) => {
  const response: string = RegisterUserService(req.body);
  res.status(200).send(response);
});

module.exports = router;
