const { classesCollection, usersCollection } = require("../db");
const { ObjectId } = require("mongodb");

module.exports.findAll = async (req, res) => {
  let classes = await classesCollection.find().toArray();
  res.send(classes);
};

// module.exports.addClass = async (req, res) => {
//   const newClass = req.body;
//   const userEmail = newClass.instructorEmail;
//   const user = await usersCollection.findOne({ email: userEmail });
//   if (!user) {
//     return res.status(404).send("User not found");
//   }
//   if (!user.classes) {
//     user.classes = [];
//   }
//   user.classes.push(newClass);
//   const updatedUser = await usersCollection.findOneAndUpdate(
//     { email: userEmail },
//     { $set: user },
//     { returnOriginal: false }
//   );
//   const insertedClass = await classesCollection.insertOne(newClass);
//   res.send({
//     user: updatedUser.value,
//     class: insertedClass,
//   });
// };
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
