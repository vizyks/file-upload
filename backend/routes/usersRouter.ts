import { Router } from "express";
import * as usersController from "../controllers/usersController";
const usersRouter = Router();

usersRouter.get("/logout", usersController.logOut);
usersRouter.post("/login", usersController.logIn);
usersRouter.post("/signup", usersController.signUp);

export default usersRouter;
