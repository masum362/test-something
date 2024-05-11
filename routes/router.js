import expres from "express";
import {
  addBook,
  addUser,
  getSingleUser,
  homePage,
} from "../controllers/authControllers.js";

const router = expres.Router();

// users apis
router.get("/", homePage);
router.get("/user/:id", getSingleUser);
router.post("/add-user", addUser);

// books apis
router.get("/add-book", addBook);

export default router;
