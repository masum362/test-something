import dotenv from "dotenv";
dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb";

const url = process.env.MONGODBURL;
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



const db = client.db("AcademyCloudDB");
const usersCollection = db.collection("users");
const categoryCollection = db.collection("categories");
const booksCollection = db.collection("books");
const borrowedBooksCollection = db.collection("borrowedBooks");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    //  const response =  await client.db("admin").command({ ping: 1 });
    console.log("successfully connected database");
  } catch (err) {
    console.log(err);
  }
}

export {
  usersCollection,
  categoryCollection,
  booksCollection,
  borrowedBooksCollection,
};

export default run;
