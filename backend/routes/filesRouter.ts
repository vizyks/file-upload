import { Router } from "express";
import * as filesController from "../controllers/filesController";
import authenticate from "../middleware/authMiddleware";
const filesRouter = Router();

filesRouter.post("/upload", authenticate("jwt"), filesController.uploadFile);
filesRouter.get("/:fileId", filesController.getFile);
filesRouter.delete("/:fileId", filesController.deleteFile);

export default filesRouter;
