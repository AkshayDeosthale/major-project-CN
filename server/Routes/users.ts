import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  RegisterUserService,
  UserMongooseResponse,
} from "../Controllers/Users.controller";

export interface ResponseDTO {
  message: string[];
  success: boolean;
}

export interface LoginResponseDTO extends ResponseDTO {
  id?: string;
  userDetail?: UserMongooseResponse;
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

//manual login
// router.post("/login", async (req: Request, res: Response) => {
//   const response: LoginResponseDTO = await LoginService(req.body);

//   if (response.success) {
//     res.status(200).cookie("user", response.id).send(response);
//   } else {
//     res.status(500).send(response);
//   }
// });

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: Error, user: LoginResponseDTO, info: any) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(401).send(info);
      }
      req.logIn(user, (err: Error) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(user);
      });
    }
  )(req, res, next);
});

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: [`User Logged out Successfully.`],
    success: true,
  });
});

module.exports = router;
