import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import run from "./db/connection.js";

dotenv.config();

const corsConfig = {
  credentials: true,
  origin: [
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5173",
  ],
};

const app = express();
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 3000;
run();
app.listen(port, function () {
  console.log(`server listening on ${port}`);
});
