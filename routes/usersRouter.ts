import { Router } from "express";
import * as usersController from "../controllers/usersController";
const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.send("This is the home index page of file upload.");
});

usersRouter.get("/logout", usersController.logout);
usersRouter.post("/login", usersController.login);
usersRouter.post("/signup", usersController.signup);

export default usersRouter;
