import passport from "passport";
import USER from "../Models/User.schema";
import { LoginResponseDTO, ResponseDTO } from "../Routes/users";
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    username: string,
    password: string,
    done: (error: ResponseDTO | null, user?: LoginResponseDTO | false) => void
  ) {
    if (username === "general@user") {
      return done(
        {
          message: [`Duplicate key error: Username or Email Already exists`],
          success: false,
        },
        false
      );
    }
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
  try {
    const user = USER.findById(id);
    return done(null, user);
  } catch (error) {
    return error;
  }
});

// passport.setAuthenticatedUser = function (req,res,next) {

// }

module.exports = passport;
