import expres from "express";
import {
  addBook,
  addUser,
  getAllCategory,
  getAvailableBooks,
  getBooks,
  getSingleBook,
  getSingleUser,
  homePage,
  loginUser,
  logoutUser,
} from "../controllers/authControllers.js";
import auth from "../middleware/privateRoute.js";

const router = expres.Router();

// users apis
router.get("/", homePage);
router.get("/user/:id", auth, getSingleUser);
router.post("/add-user", addUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);

// books apis
router.get("/books", getBooks);
router.get("/available-books", getAvailableBooks);
router.get("/book/:id", auth, getSingleBook);
router.post("/add-book", auth, addBook);

// category apis
router.get("/countries", getAllCategory);

export default router;
