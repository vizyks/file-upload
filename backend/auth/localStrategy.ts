import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../prismaClient";
import { CustomVerifyOptions } from "../types/auth";

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Check username and password if empty and return to reduce redundant DB connections
      // Either check it like this or use the actual schema provided '@packages/schema' (Prob Better)
      if (username.length < 1)
        return done(null, false, {
          field: "username",
          message: "Username can not be empty.",
          statusCode: 400,
        } as CustomVerifyOptions);

      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user)
        return done(null, false, {
          field: "username",
          message: "User not found",
          statusCode: 401,
        } as CustomVerifyOptions);
      // Update when bcrypt is implemented
      if (user.password !== password)
        return done(null, false, {
          field: "password",
          message: "Invalid credentials",
          statusCode: 401,
        } as CustomVerifyOptions);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
