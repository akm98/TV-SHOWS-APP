const express = require("express");
const { registerUser, userLogin } = require("../controller/userController");

const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(userLogin);

module.exports = router;
