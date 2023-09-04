import passport from "passport";
import LocalStrategy from "passport-local";
import USER from "../Models/User.schema";
import { UserMongooseResponse } from "../Controllers/Users.controller";

passport.use(
  new LocalStrategy.Strategy({ usernameField: "email" }, function (
    username,
    password,
    done
  ) {
    USER.findOne({ email: username }, function (err: any, user: any) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
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
