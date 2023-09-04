import express, { NextFunction, Request, Response } from "express";
import {
  LoginService,
  RegisterUserService,
} from "../Controllers/Users.controller";
import passport from "passport";

export interface ResponseDTO {
  message: string[];
  success: boolean;
}

export interface LoginResponseDTO extends ResponseDTO {
  id?: string;
}

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const response: ResponseDTO = await RegisterUserService(req.body);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});

router.post(
  "/login",
  // passport.authenticate("local"),
  async (req: Request, res: Response) => {
    const response: LoginResponseDTO = await LoginService(req.body);

    if (response.success) {
      res.status(200).cookie("user", response.id).send(response);
    } else {
      res.status(500).send(response);
    }
  }
);

module.exports = router;
