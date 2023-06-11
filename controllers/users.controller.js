const { usersCollection } = require("../db");
const { ObjectId } = require("mongodb");

module.exports.findAll = async (req, res) => {
  let classes = await usersCollection.find().toArray();
  res.send(classes);
};

module.exports.addUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  const existingUser = await usersCollection.findOne(query);
  if (existingUser) {
    return res.send({ message: "User already exists" });
  }
  if (user.email) {
    const result = await usersCollection.insertOne(req.body);
    res.send(result);
  }
};

module.exports.makeAdmin = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: "admin",
    },
  };

  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
};
//check user admin or not
module.exports.checkAdmin = async (req, res) => {
  const email = req.params.email;
  if (req.decoded.email !== email) {
    res.send({ admin: false });
  }
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { admin: user?.role === "admin" };
  res.send(result);
};
//check user admin or not
module.exports.checkInstructor = async (req, res) => {
  const email = req.params.email;
  // if (req.decoded.email !== email) {
  //   res.send({ admin: false });
  // }
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { admin: user?.role === "instructor" };
  res.send(result);
};
module.exports.makeInstructor = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      role: "instructor",
    },
  };

  const result = await usersCollection.updateOne(filter, updateDoc);
  res.send(result);
};
