import { Router } from "express";
import * as filesController from "../controllers/filesController";
import authenticate from "../middleware/authMiddleware";
import upload from "../middleware/fileUploadMiddleware";
const filesRouter = Router();

filesRouter.get("/", authenticate("jwt"), filesController.getAllFiles);
filesRouter.post(
  "/upload",
  authenticate("jwt"),
  upload("file"),
  filesController.uploadFile
);
filesRouter.get("/download", filesController.downloadFile);
filesRouter.get("/:fileId", filesController.getFile);
filesRouter.delete("/:fileId", filesController.deleteFile);

export default filesRouter;
