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
  getBorrowedBooks,
  addBorrowedBook,
  returnBorrowedBook,
  getCategoryBooks
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

// borrowed books
router.get("/borrowed-books", auth, getBorrowedBooks);
router.put("/return-borrowed-book/:id", auth, returnBorrowedBook);
router.post("/add-borrowed-books", auth, addBorrowedBook);

// categories api
router.get('/categories',getAllCategory)
router.get('/category/:id',getCategoryBooks)

export default router;
