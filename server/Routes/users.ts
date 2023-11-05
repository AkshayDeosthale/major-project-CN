import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  GetAllUsers,
  LoginService,
  RegisterUserService,
  UpdateProfile,
  UserMongooseResponse,
  getMFACode,
  getUserDetails,
  verifyMFA,
} from "../Controllers/Users.controller";
import USER from "../Models/User.schema";
import * as nodemailer from "nodemailer";

export interface ResponseDTO {
  message: string[];
  success: boolean;
  data?: unknown;
}

export interface LoginResponseDTO extends ResponseDTO {
  id?: string;
  userDetail?: UserMongooseResponse;
}

const router = express.Router();

//making a general user which is separate from real user
router.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkdefaultUserInstance = await USER.findOne({
      email: "general@user",
    });
    if (!checkdefaultUserInstance) {
      const creategeneralaUser = new USER({
        username: "general",
        email: "general@user",
        password: "generaluser",
      });
      await creategeneralaUser.save();
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/login",
  }),
  function (req: Request, res: Response) {
    console.log("this ran");

    res.redirect("/");
  }
);

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
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

//multifactor auth
router.post(
  "/getmfauth",
  async (req: Request, res: Response, next: NextFunction) => {
    const response: ResponseDTO = await getMFACode(req, res);
    if (response.success) {
      res.status(200).send(response);
    } else {
      res.status(500).send(response);
    }
  }
);

router.post(
  "/verifymfa",
  async (req: Request, res: Response, next: NextFunction) => {
    const response: ResponseDTO = await verifyMFA(req, res);
    if (response.success) {
      res.status(200).send(response);
    } else {
      res.status(500).send(response);
    }
  }
);

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logOut((done) => done);
  res.status(200).send("logged out");
});

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(444).send("User is not authenticated");
  }
});

router.get("/profile/:id", async (req: Request, res: Response) => {
  const response = await getUserDetails(req.params.id);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});

router.post("/profile/:id", async (req: Request, res: Response) => {
  const response = await UpdateProfile(req, res, req.params.id);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(500).send(response);
  }
});

router.get("/all", async (req: Request, res: Response) => {
  const response = await GetAllUsers();
  res.status(200).send(response);
});

module.exports = router;
