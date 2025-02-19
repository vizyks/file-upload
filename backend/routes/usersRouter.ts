import { Router } from "express";
import * as usersController from "../controllers/usersController";
import authenticate from "../middleware/authMiddleware";
const usersRouter = Router();

usersRouter.get("/logout", usersController.logOut);
usersRouter.post("/login", authenticate("local"), usersController.logIn);
usersRouter.post("/signup", usersController.signUp);

export default usersRouter;
