import { Request, Response, NextFunction } from "express";
import {
  userSignUpSchema,
  UserSignUp,
  userLogInSchema,
  UserLogIn,
} from "@packages/schema";
import prisma from "../prismaClient";

const asyncWrapper =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const logOut = (req, res) => {
  console.log("This is a logout route");
  res.send("This is a logout route.");
};

export const logIn = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Successful validation sign JWT

  console.log("Log in from useControler");
});

export const signUp = asyncWrapper(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const result = userSignUpSchema.safeParse(req.body);

  if (!result.success) {
    const error = result.error.flatten();
    return res.status(400).send(error.fieldErrors);
  }

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
      const errors: Record<string, string> = {};
      if (existingUser.username === username) {
        errors.username = "Username already exists.";
      }
      if (existingUser.email === email) {
        errors.email = "Email already exists.";
      }

      return res.status(400).send(errors);
    }

    // Implement Bcrypt to hash user password
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    return res.status(201).send("User created successfully.");
  } catch (err) {
    // Catch any other errors e.g P2002 is "Unique constraint failed on the {constraint}"
    // P2002 shouldn't be called because already checking if fields are Unique.
    if (err.code === "P2002") {
      console.log("ERROR", err.meta);
    } else {
      console.log(err);
    }
  }
});
