import { Router } from "express";
import * as filesController from "../controllers/filesController";
import authenticate from "../middleware/authMiddleware";
import upload from "../middleware/fileUploadMiddleware";
const filesRouter = Router();

// post to / instead of upload
filesRouter.get("/", authenticate("jwt"), filesController.getAllFiles);
filesRouter.post(
  "/upload",
  authenticate("jwt"),
  upload("file"),
  filesController.uploadFile
);
// post to / aswell and differentiate between folder or file creation
filesRouter.post("/create", authenticate("jwt"), filesController.createFolder);
filesRouter.get("/download", filesController.downloadFile);
filesRouter.get("/:fileId", filesController.getAllFilesInFolder);
filesRouter.delete("/:fileId", filesController.deleteFile);

export default filesRouter;
