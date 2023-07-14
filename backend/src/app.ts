import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import { indexRouter } from "./routes";
import { connect } from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors()); // Enable CORS for all origins

app.use("/", indexRouter);

connect(process.env.MONGODB_URI || "mongodb://localhost/myapp", {})
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((error) => console.error(error));
