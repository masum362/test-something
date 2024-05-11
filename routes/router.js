import expres from "express";
import {
  addBook,
  addUser,
  getAllCategory,
  getSingleBook,
  getSingleUser,
  homePage,
  loginUser,
} from "../controllers/authControllers.js";

const router = expres.Router();

// users apis
router.get("/", homePage);
router.get("/user/:id", getSingleUser);
router.post("/add-user", addUser);
router.post("/login",loginUser)

// books apis
router.get("/book/:id", getSingleBook);
router.post("/add-book", addBook);

// category apis
router.get("/countries", getAllCategory);

export default router;
