const { usersCollection } = require("../db");
const { ObjectId } = require("mongodb");

module.exports.findAll = async (req, res) => {
  let classes = await usersCollection.find().toArray();
  res.send(classes);
};
module.exports.findOne = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const userWithClasses = await usersCollection
      .aggregate([
        {
          $match: { email: userEmail },
        },
        {
          $lookup: {
            from: "classes",
            localField: "classes",
            foreignField: "_id",
            as: "classes",
          },
        },
      ])
      .toArray();

    if (userWithClasses.length === 0) {
      return res.status(404).send("User not found");
    }

    res.send(userWithClasses[0]);
  } catch (error) {
    res.status(500).send("Error retrieving user with classes");
  }
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
  if (req.decoded.email !== email) {
    res.send({ instructor: false });
  }
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  const result = { instructor: user?.role === "instructor" };
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

//selected class and push to id user model

module.exports.selecteClass = async (req, res) => {
  const userEmail = req.params.email;
  const classId = req.body.classId;
  usersCollection.updateOne(
    { email: userEmail },
    { $push: { selectedClasses: classId } }
  );
  res.send("Class ID pushed to database");
};
