import { Router } from "express";
import * as filesController from "../controllers/filesController";
const filesRouter = Router();

filesRouter.post("/upload", filesController.uploadFile);

filesRouter.get("/:fileId", filesController.getFile);

filesRouter.delete("/:fileId", filesController.deleteFile);

export default filesRouter;
