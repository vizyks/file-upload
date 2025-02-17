import { Request, Response, NextFunction } from "express";
import {
  userSignUpSchema,
  UserSignUp,
  userLogInSchema,
  UserLogIn,
} from "@packages/schema";

const asyncWrapper =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const logOut = (req, res) => {
  console.log("This is a logout route");
  res.send("This is a logout route.");
};

export const logIn = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    console.log(`LOGIN => Username: ${username}, Password ${password}`);

    const result = userLogInSchema.safeParse(req.body);
    if (result.success) {
      // check if username exists
      // return username doesn't exists
      // check if password matches
      // return error, wrong password

      // log in user
      console.log(result);
      res.send(result.success);
    } else {
      // return errors
      const error = result.error.flatten();
      //error.fieldErrors[<FieldName>][0]
      console.log(error.fieldErrors);
      res.status(400).send(error.fieldErrors);
    }
    //res.redirect("/");
    //next(err);
  }
);

export const signUp = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    console.log(
      `SIGNUP => Username: ${username}, Email: ${email} Password ${password}`
    );

    const result = userSignUpSchema.safeParse(req.body);
    if (result.success) {
      // check if email already exists/in use
      // if email exists, return error
      // eles create user
      console.log(result);
      res.send(result.success);
    } else {
      // return errors
      const error = result.error.flatten();
      //error.fieldErrors[<FieldName>][0]
      console.log(error.fieldErrors);
      res.status(400).send(error.fieldErrors);
    }
    //res.redirect("/");
    //next(err);
  }
);
