import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { CustomVerifyOptions, Strategy } from "../types/auth";

const authenticate =
  (strategy: Strategy) => (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      strategy,
      { session: false },
      // Typecheck User when a userschema is created.
      (err: Error, user, info: CustomVerifyOptions) => {
        if (err)
          return res.status(500).send({ message: "Internal server error" });

        if (!user) {
          const key: string = info.field;
          return res
            .status(info?.status || 400)
            .send({ [key]: info.message || "Login failed." });
        }

        req.user = user;
        next();
      }
    )(req, res, next);
  };

export default authenticate;
