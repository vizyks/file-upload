import "dotenv/config";
import prisma from "../prismaClient";
import asyncWrapper from "../utils/asyncWrapper";
import { fileSchema } from "@packages/schema";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.PROJECT_URL, process.env.API_KEY);

export const getAllFiles = asyncWrapper(async (req, res) => {
  const { id } = req.user;

  try {
    const files = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        files: true,
      },
    });

    console.log(files);
    res.status(200).send(files);
  } catch (err) {
    console.log(err);
  }
});

export const getFile = asyncWrapper(async (req, res) => {
  const { fileId } = req.params;
  // Mock information
  try {
    const files = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      include: {
        files: true,
      },
    });

    res.send(files);
  } catch (err) {
    console.log(err);
  }
});

export const uploadFile = asyncWrapper(async (req, res) => {
  if (!req.file) return;
  const { id } = req.user;
  const { originalname, mimetype, size, buffer } = req.file;

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
    // Change upload to upload in the users own folder e.g .upload(<USERID> + originalName).
    // Also think about changing originalname to just a UUID to store in DB
    const { data, error } = await supabase.storage
      .from("warp")
      .upload(originalname, buffer, {
        contentType: mimetype,
      });

    if (error)
      return res.status(400).send({ message: "File failed to upload" });

    // Change URL property when schema changes, think about using a UUID instead since you can
    // just search the bucket for the file instead of using a URL.
    const file = await prisma.file.create({
      data: {
        name: originalname,
        type: mimetype,
        size: size,
        url: "http://somecloudstorage.com",
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });

    return res.send(req.file);
  } catch (err) {
    console.log(err);
    // If the database entry fails, delete the uploaded file
    await supabase.storage.from("warp").remove([originalname]);

    return res.status(400).send(err);
  }
});

export const deleteFile = (req, res) => {
  const { fileId } = req.params;
  res.send(`File ID: ${fileId} is now deleted`);
};

export const downloadFile = asyncWrapper(async (req, res) => {
  const { data, error } = await supabase.storage
    .from("test")
    .download("discordBotIntents.png");

  if (error) {
    console.log(error);
    res.send(error);
  } else {
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="discordBotIntents.png"'
    );
    res.setHeader("Content-Type", "image/png");

    // Convert Blob to ArrayBuffer, then send as response
    const buffer = Buffer.from(await data.arrayBuffer());
    res.end(buffer);
  }
});
