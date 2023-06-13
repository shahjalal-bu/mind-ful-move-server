const { paymentCollection } = require("../db");

module.exports.findWithEmail = async (req, res) => {
  const { email } = req.params;
  let payments = await paymentCollection
    .find({ paymentBy: email })
    .sort({ date: 1 })
    .toArray();
  res.send(payments);
};
