import { booksCollection, categoryCollection } from "../db/connection.js";

const homePage = () => {
  console.log("homePage called");
};

const addUser = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    const response = await userCollection.insertOne(user);
    console.log(response);
    res.status(201).json({ response });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = req.body;
    const isUser = await userCollection.findOne({ uid: user.uid });
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

const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await userCollection.findOne({ uid: id });
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

    console.log(post);
    const response = await booksCollectionCollection.insertOne(book);

    console.log(response);
    res.status(201).json({ response });
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
  getSingleUser,
  addBook,
  getSingleBook,
  getAllCategory,
};
