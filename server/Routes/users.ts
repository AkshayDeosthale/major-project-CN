import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import {
  GetAllUsers,
  RegisterUserService,
  UpdateProfile,
  UserMongooseResponse,
} from "../Controllers/Users.controller";
import USER from "../Models/User.schema";

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
