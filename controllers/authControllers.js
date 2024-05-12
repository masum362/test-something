import {
  booksCollection,
  categoryCollection,
  usersCollection,
} from "../db/connection.js";
import jwt from "jsonwebtoken";

const homePage = async (req, res) => {
  const data = [
    {
      photoURL: "https://i.ibb.co/w0m22Sq/45047384.jpg",
      name: "The House in the Cerulean Sea",
      quantity: 5,
      author: "T.J. Klune",
      Category: "Fiction",
      short_description:
        "A heartwarming story about a case worker who visits magical orphanages.",
      rating: 4.5,
      content:
        "A charming and whimsical novel that will leave you feeling hopeful and optimistic.",
    },
    {
      photoURL: "https://i.ibb.co/K5VjPHp/54493401.jpg",
      name: "Project Hail Mary",
      quantity: 3,
      author: "Andy Weir",
      Category: "Sci-Fi",
      short_description:
        "An amnesiac astronaut wakes up on a spaceship with no memory of his mission.",
      rating: 4.8,
      content:
        "A thrilling and suspenseful sci-fi adventure that will keep you guessing until the very end.",
    },
    {
      photoURL:
        "https://i.ibb.co/xXKSrC2/91-ORNIo99-SL-AC-UF1000-1000-QL80.jpg",
      name: "Atlas of the Heart",
      quantity: 2,
      author: "Brené Brown",
      Category: "Non-Fiction",
      short_description: "Explores the complex emotions that define our lives.",
      rating: 4.2,
      content:
        "A thought-provoking and insightful exploration of human emotions.",
    },
    {
      photoURL:
        "https://i.ibb.co/W3DgKgD/81ij-POty-W7-L-AC-UF1000-1000-QL80-Dp-Weblab.jpg",
      name: "Lightyears",
      quantity: 7,
      author: "Claudia Gray",
      Category: "Sci-Fi",
      short_description:
        "A young woman signs up for a faster-than-light colonization mission.",
      rating: 4.0,
      content:
        "A captivating and imaginative sci-fi novel that explores the themes of identity and belonging.",
    },
    {
      photoURL: "https://i.ibb.co/QdCB5S8/52578297.jpg",
      name: "The Midnight Library",
      quantity: 1,
      author: "Matt Haig",
      Category: "Fantasy",
      short_description:
        "A woman on the verge of ending her life finds herself in a library of alternate realities.",
      rating: 4.7,
      content:
        "A moving and thought-provoking exploration of life, death, and regret.",
    },
    {
      photoURL: "https://i.ibb.co/HPJgxRW/81g5-LETk1z-L-UX250.jpg",
      name: "Born a Crime",
      quantity: 8,
      author: "Trevor Noah",
      Category: "Biography",
      short_description:
        "The comedian tells the story of his childhood growing up in South Africa during apartheid.",
      rating: 4.3,
      content: "A powerful and inspiring memoir about overcoming adversity.",
    },
  ];

  const response = await booksCollection.insertMany(data);
  res.send(response);
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
    const response = await usersCollection.insertOne({
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email ? user.email : "",
      uid: user.uid,
    });
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

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token").status(201).json({ message: "user logged out" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

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
      ...book,
      uid: req.userId,
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
    const response = booksCollection.find({});
    const books = await response.toArray();
    console.log(books);
    res.status(201).json({ books });
  } catch (error) {
    console.log(error);

    res.status(501).json({ message: error.message });
  }
};

const getAvailableBooks = async (req, res) => {
  try {
    const response = booksCollection.find({
      quantity: { $gt: 0 },
    });
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
  getAvailableBooks,
  addBook,
  getSingleBook,
  getAllCategory,
};
