//configure dot env
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const morgan = require("morgan");
const app = express();
const port = 5000 || process.env.PORT;
const { varifyJWT } = require("./middlewares/middlewares");
const { paymentCollection, classesCollection } = require("./db");
const { ObjectId } = require("mongodb");
//db
require("./db");

//routes
const classesRouter = require("./routes/classes");
const usersRouter = require("./routes/users");
const paymentRouter = require("./routes/payment");

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "index.html");

  res.sendFile(htmlFilePath, (err) => {
    if (err) {
      console.error("Error sending HTML file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

//create payment intent
app.post("/create-payment-intent", varifyJWT, async (req, res) => {
  const { classId } = req.body;
  const classObjectId = new ObjectId(classId);
  const query = { _id: classObjectId };
  const classData = await classesCollection.findOne(query);
  const amount = parseInt(+classData?.price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//jwt
app.post("/jwt", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

app.use("/classes", classesRouter);
app.use("/users", usersRouter);
app.use("/payment", paymentRouter);

app.listen(port, () => {
  console.log(`Mindfulmove listening on port ${port}`);
});
