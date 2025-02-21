import "dotenv/config";
import passport from "passport";
import { Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import prisma from "../prismaClient";

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }

  return token;
};

const options: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_VALUE as string,
};

export default passport.use(
  new JwtStrategy(options, (payload, done) => {
    try {
      const user = prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (!user)
        return done(null, false, {
          field: "user",
          message: "Unauthorized",
          statusCode: 401,
        });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
