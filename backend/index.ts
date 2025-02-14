import "dotenv/config";
import express from "express";
import cors from "cors";
import usersRouter from "./routes/usersRouter";
import filesRouter from "./routes/filesRouter";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: false }));

// change endpoint to start with /api/v1
app.use("/", usersRouter);
app.use("/files", filesRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
