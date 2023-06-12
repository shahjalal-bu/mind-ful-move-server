const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const { varifyJWT, verifyAdmin } = require("../middlewares/middlewares");
router.get("/", varifyJWT, verifyAdmin, usersController.findAll);
router.get("/:email", usersController.findOne);
router.post("/", usersController.addUser);
router.get("/check-admin/:email", varifyJWT, usersController.checkAdmin);
router.get(
  "/check-instructor/:email",
  varifyJWT,
  usersController.checkInstructor
);
router.patch("/make-instructor/:id", usersController.makeInstructor);
router.patch("/select-class/:email", usersController.selecteClass);
router.patch("/delete-class/:email", usersController.deleteClass);
router.patch("/payment/:email", varifyJWT, usersController.payment);

module.exports = router;
