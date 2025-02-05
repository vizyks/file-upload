import "dotenv/config";
import express from "express";
import usersRouter from "./routes/usersRouter";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.use("/", usersRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
