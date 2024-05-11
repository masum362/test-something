import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";

dotenv.config();

const cookieConfig = {
  credentials: true,
  origin: [
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5173",
  ],
};

const app = express();
app.use(cors(cookieConfig));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server listening on ${port}`);
});
