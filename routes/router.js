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
  getCategoryBooks,
  updateBook
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
router.get("/books",auth, getBooks);
router.get("/available-books",auth, getAvailableBooks);
router.get("/book/:id", auth, getSingleBook);
router.post("/add-book", auth, addBook);
router.patch("/update-book/:id",auth,updateBook)

// borrowed books
router.get("/borrowed-books", auth, getBorrowedBooks);
router.put("/return-borrowed-book/:id", auth, returnBorrowedBook);
router.post("/add-borrowed-books", auth, addBorrowedBook);

// categories api
router.get('/categories',getAllCategory)
router.get('/category/:id',auth,getCategoryBooks)

export default router;
