const { classesCollection, usersCollection } = require("../db");
const { ObjectId } = require("mongodb");

//find all classes

module.exports.findAll = async (req, res) => {
  let classes = await classesCollection.find().toArray();
  res.send(classes);
};

//add class
module.exports.addClass = async (req, res) => {
  const newClass = req.body;
  const userEmail = newClass.instructorEmail;
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const insertedClass = await classesCollection.insertOne(newClass);
  const classId = insertedClass.insertedId;
  if (!user.classes) {
    user.classes = [];
  }
  user.classes.push(classId);
  const updatedUser = await usersCollection.findOneAndUpdate(
    { email: userEmail },
    { $set: user },
    { returnOriginal: false }
  );

  res.send({
    user: updatedUser.value,
    class: insertedClass,
  });
};



//update class status to approved

module.exports.aprrovedClass = async (req, res) => {
  const id = req.params.classId;
  console.log(id);
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      status: "approved",
    },
  };
  const result = await classesCollection.updateOne(filter, updateDoc);
  res.send(result);
};

//update class status to deny

module.exports.deniedClass = async (req, res) => {
  const id = req.params.classId;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      status: "denied",
    },
  };
  const result = await classesCollection.updateOne(filter, updateDoc);
  res.send(result);
};

//update class feedback
module.exports.feedbackClass = async (req, res) => {
  const id = req.params.classId;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: {
      feedback: req.body.feedback,
    },
  };
  const result = await classesCollection.updateOne(filter, updateDoc);
  res.send(result);
};
