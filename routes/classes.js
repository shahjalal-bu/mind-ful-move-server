const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.controller");
const { varifyJWT } = require("../middlewares/middlewares");

router.get("/", classesController.findAll);
router.post("/", classesController.addClass);

module.exports = router;
