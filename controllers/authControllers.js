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

const getSingleBook= async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const book= await booksCollection.findOne(filter);
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

export { homePage, addUser, getSingleUser, addBook,getSingleBook,getAllCategory };
