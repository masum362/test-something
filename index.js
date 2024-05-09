import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.NODE_ENV === "production" ? "" : "http://localhost:5173",
    ],
  })
);

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log(`server listening on ${port}`)
})
