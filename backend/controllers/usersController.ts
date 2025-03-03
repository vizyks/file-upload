import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import {
  userSignUpSchema,
  UserSignUp,
  userLogInSchema,
  UserLogIn,
} from "@packages/schema";
import prisma from "../prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncWrapper from "../utils/asyncWrapper";

export const authMe = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
      },
    });

    res.status(200).send(user);
  } catch (err) {
    res.send(err);
  }
});

export const logOut = (req, res) => {
  console.log("This is a logout route");
  res.send("This is a logout route.");
};

export const logIn = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.user;

  const token = jwt.sign({ id: id }, process.env.SECRET_VALUE as string, {
    expiresIn: "1hr",
  });

  // max age = 1hr | 3600000, calculated in ms
  res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
  res.status(200).send("Successfully logged in");
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
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
