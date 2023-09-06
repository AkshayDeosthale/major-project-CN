import passport from "passport";
const LocalStrategy = require("passport-local");
import USER from "../Models/User.schema";
import { UserMongooseResponse } from "../Controllers/Users.controller";
import { LoginResponseDTO, ResponseDTO } from "../Routes/users";

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    username: string,
    password: string,
    done: (error: ResponseDTO | null, user?: LoginResponseDTO | false) => void
  ) {
    USER.findOne({ email: username })
      .then((user: any) => {
        if (!user) {
          console.log("user does not exist");
          return done(
            {
              message: [`User does not exist.`],
              success: false,
            },
            false
          );
        }
        if (user.password !== password) {
          return done(
            {
              message: [`Credentials are incorrect.`],
              success: false,
            },
            false
          );
        }
        console.log("Authenticated");
        return done(null, {
          message: [`Login SuccessFul`],
          success: true,
          id: user._id.toString(),
          userDetail: user,
        });
      })
      .catch((err: any) => {
        return done(err);
      });
  })
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: string, done) {
  USER.findById(id, function (err: any, user: UserMongooseResponse) {
    if (err) {
      return err;
    }
    return done(null, user);
  });
});

module.exports = passport;
