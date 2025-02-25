import prisma from "../prismaClient";
import asyncWrapper from "../utils/asyncWrapper";
import { fileSchema } from "@packages/schema";

export const uploadFile = asyncWrapper(async (req, res) => {
  if (!req.file) return;
  const { id } = req.user;
  const { originalname, mimetype, size } = req.file;

  const result = fileSchema.safeParse({
    name: originalname,
    type: mimetype,
    size: size,
    userId: id,
  });

  if (!result.success) {
    const error = result.error.flatten();
    return res.status(400).send(error.fieldErrors);
  }

  try {
    // upload file
    console.log(req.file);
    res.json(req.file);
  } catch (err) {
    // return error
    res.send(err);
  }
});

export const deleteFile = (req, res) => {
  const { fileId } = req.params;
  res.send(`File ID: ${fileId} is now deleted`);
};

export const getFile = (req, res) => {
  const { fileId } = req.params;
  // Mock information
  res.send(
    `File ID: ${fileId}, Size: 16mb, Updated At: Aug 12 2024, Uploaded By: John Cena`
  );
};
