//configure dot env
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const morgan = require("morgan");
const app = express();
const port = 5000 || process.env.PORT;

//db
require("./db");

//routes
const classesRouter = require("./routes/classes");
const usersRouter = require("./routes/users");
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

app.listen(port, () => {
  console.log(`Edutoyshub listening on port ${port}`);
});
