import multer from "multer";
import { Request, Response, NextFunction } from "express";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Multer has fileFilter option to create additional checks if needed
// fileSize = 5mb | 5000000
const upload =
  (name: string) => (req: Request, res: Response, next: NextFunction) => {
    multer({ storage, limits: { fileSize: 5000000 } }).single(name)(
      req,
      res,
      (err: Error | multer.MulterError | unknown) => {
        if (err instanceof multer.MulterError) {
          return res.status(401).send({ message: "File too large" });
        } else if (err) {
          return res.status(401).send({ message: "Unknown Error", error: err });
        }

        next();
      }
    );
  };

export default upload;
