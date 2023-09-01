import express, { NextFunction, Request, Response } from "express";
import {
  LoginService,
  RegisterUserService,
} from "../Controllers/Users.controller";

export interface ResponseDTO {
  message: string[];
  success: boolean;
}

const router = express.Router();

// middleware that is specific to this router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

router.post("/register", async (req: Request, res: Response) => {
  const response: ResponseDTO = await RegisterUserService(req.body);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const response: ResponseDTO = await LoginService(req.body);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});

module.exports = router;
