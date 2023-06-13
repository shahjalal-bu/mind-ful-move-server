const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { varifyJWT, verifyAdmin } = require("../middlewares/middlewares");

router.get(
  "/find-with-email/:email",
  varifyJWT,
  paymentController.findWithEmail
);

module.exports = router;
