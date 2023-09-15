import USER from "../Models/User.schema";
import { LoginResponseDTO, ResponseDTO } from "../Routes/users";
import cryto from "crypto";
import passport from "passport";
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (
      request: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: any) => void
    ) {
      try {
        const user = await USER.find({ email: profile.email[0].value }).exec();
        console.log(profile);
        if (user) {
          return done(null, {
            message: [`User found.`],
            success: true,
          });
        } else {
          const newUser = await new USER({
            name: profile.displayName,
            email: profile.emails[0],
            password: cryto.randomBytes(20).toString("hex"),
          });
          newUser.save();
          return done(null, {
            message: [`User Created.`],
            success: true,
            data: newUser,
          });
        }
      } catch (error) {
        console.log("err in passport.auth in google strategy", error);
        return done(null, {
          message: [`Error occured.`],
          success: false,
        });
      }
    }
  )
);

export default passport;
