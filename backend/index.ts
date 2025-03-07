import "dotenv/config";
import "./auth/localStrategy";
import "./auth/jwtStrategy";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import usersRouter from "./routes/usersRouter";
import filesRouter from "./routes/filesRouter";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

// Can route to a single route of /api/v1 to improve scalability and redundancy
// Of declaring the default endpoint on every route.

app.get("/", (req, res) => res.redirect("/api/v1"));
app.get("/api/v1", (req, res) => {
  console.log("index");
  res.send("Api endpoint for Warp Files.");
});
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/files", filesRouter);

// Can create an error handling middleware to ensure the catching of all errors.

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
