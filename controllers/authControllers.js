

const homePage = () => {
    console.log('homePage called');
}

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

export {homePage,addUser}