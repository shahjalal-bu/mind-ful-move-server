const express = require("express");
const router = express.Router();
const classesController = require("../controllers/classes.controller");
const { varifyJWT, verifyAdmin } = require("../middlewares/middlewares");

router.get("/", varifyJWT, verifyAdmin, classesController.findAll);
router.post("/", classesController.addClass);
router.patch(
  "/approved-class/:classId",
  varifyJWT,
  classesController.aprrovedClass
);
router.patch("/denied-class/:classId", classesController.deniedClass);
router.patch("/feedback-class/:classId", classesController.feedbackClass);

module.exports = router;
