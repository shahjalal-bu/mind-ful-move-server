var jwt = require("jsonwebtoken");
const { usersCollection } = require("../db");

module.exports.varifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).send({
        message: "Unauthorized access",
      });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports.verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  if (user?.role !== "admin") {
    return res.status(403).send({ error: true, message: "forbidden message" });
  }
  next();
};

module.exports.verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  if (user?.role !== "instructor") {
    return res.status(403).send({ error: true, message: "forbidden message" });
  }
  next();
};
