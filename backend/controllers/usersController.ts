import { Request, Response, NextFunction } from "express";
import {
  userSignUpSchema,
  UserSignUp,
  userLogInSchema,
  UserLogIn,
} from "@packages/schema";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const signUp = asyncWrapper(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const result = userSignUpSchema.safeParse(req.body);

  // Check if initial schema validation succeded
  if (result.success) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: username,
            },
            {
              email: email,
            },
          ],
        },
      });

      // Check if username and or email already exists
      if (existingUser) {
        const errors: Record<string, string[]> = {};
        if (existingUser.username === username) {
          errors.username = ["Username already exists."];
        }
        if (existingUser.email === email) {
          errors.email = ["Email already exists."];
        }

        res.status(400).send(errors);
      } else {
        // Create user if no conflicts
        const user = await prisma.user.create({
          data: {
            username: username,
            email: email,
            password: password,
          },
        });

        console.log("USER CREATED:", user);
        res.status(201).send("User created successfully.");
      }
    } catch (err) {
      // Catch any other errors e.g P2002 is "Unique constraint failed on the {constraint}"
      // P2002 shouldn't be called because already checking if fields are Unique.
      if (err.code === "P2002") {
        console.log("ERROR", err.meta);
      } else {
        console.log(err);
      }
    }
  } else {
    // Return initial schema validation errors
    const error = result.error.flatten();
    res.status(400).send(error.fieldErrors);
  }
});
