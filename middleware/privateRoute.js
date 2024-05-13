import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(404).json("invalid user");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(404).send("invalid user");
    req.userId = decoded.id;
    next();
  });
};

export default auth;
