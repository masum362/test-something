import {
  booksCollection,
  categoryCollection,
  usersCollection,
} from "../db/connection.js";
import jwt from "jsonwebtoken";

const homePage = () => {
  console.log("homePage called");
};

const addUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const isUser = await usersCollection.findOne({ uid: user.uid });
    if (isUser) {
      return res.status(201).json({ message: "Already a user" });
    }
    const response = await usersCollection.insertOne(
      {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email ? user.email :"",
        uid: user.uid,
      }
    );
    console.log(response);
    return res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  console.log("called");
  try {
    const user = req.body;
    const isUser = await usersCollection.findOne({ uid: user.uid });
    if (isUser) {
      const token = jwt.sign({ id: isUser.uid }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log({ token });

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      };

      res
        .cookie("token", token, cookieOptions)
        .status(200)
        .json({ message: "user logged in successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

const logoutUser =(req ,res) => {
  try {
    res.clearCookie("token").status(201).json({message:"user logged out"});  
  } catch (error) {
    res.status(501).json({ message: error.message });

  }
}



const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await usersCollection.findOne({ uid: id });
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const book = req.body;

    console.log(book);
    const response = await booksCollection.insertOne({
      ...book,uid:req.userId,
    });

    console.log(response);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);

    res.status(501).json({ message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const response = booksCollectionCollection.find({});
    const books = await response.toArray();
    console.log(books);
    res.status(201).json({ books });
  } catch (error) {
    console.log(error);

    res.status(501).json({ message: error.message });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const book = await booksCollection.findOne(filter);
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const response = categoryCollection.find();
    const categories = await response.toArray();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

export {
  homePage,
  addUser,
  loginUser,
  logoutUser,
  getSingleUser,
  getBooks,
  addBook,
  getSingleBook,
  getAllCategory,
};
