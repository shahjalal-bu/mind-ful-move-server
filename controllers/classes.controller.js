const { classesCollection } = require("../db");
const { ObjectId } = require("mongodb");

module.exports.findAll = async (req, res) => {
  let classes = await classesCollection.find().toArray();
  res.send(classes);
};

module.exports.addClass = async (req, res) => {
  const newClass = await classesCollection.insertOne(req.body);
  res.send(newClass);
};

