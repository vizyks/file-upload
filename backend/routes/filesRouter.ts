import { Router } from "express";
import * as filesController from "../controllers/filesController";
import authenticate from "../middleware/authMiddleware";
import upload from "../middleware/fileUploadMiddleware";
const filesRouter = Router();

filesRouter.post(
  "/upload",
  /*authenticate('jwt'),*/ upload("file"),
  filesController.uploadFile
);
filesRouter.get("/:fileId", filesController.getFile);
filesRouter.delete("/:fileId", filesController.deleteFile);

export default filesRouter;
