import "dotenv/config";
import express from "express";
import usersRouter from "./routes/usersRouter";
import filesRouter from "./routes/filesRouter";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.use("/", usersRouter);
app.use("/file", filesRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
