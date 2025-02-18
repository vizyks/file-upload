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

export const logIn = asyncWrapper(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const result = userLogInSchema.safeParse(req.body);

  // Check if initial schema validation is successful
  if (result.success) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (user) {
        // Update with bcrypt when implemented
        if (user.password !== password) {
          res.status(400).send({ password: ["Wrong password."] });
        } else {
          // LogIn user by returning a session cookie
          res.status(200).send("Successfully logged in.");
        }
      } else {
        res.status(400).send({ username: ["User does not exist."] });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    const error = result.error.flatten();
    res.status(400).send(error.fieldErrors);
  }
});

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

        // Implement Bcrypt to hash user password
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
