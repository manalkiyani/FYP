const express = require("express");

const { 
  register,
  login,
  getAllUsers,
  getUser,
  updateUser,
  resetPassword,
  generateOTP,
  verifyOTP,
  createResetSession,
  verifyUser,
} = require("../controllers/auth.controller");

const { registerMail } = require("../controllers/mailer");
const { Auth, localVariables } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);

router.get("/getUsers", getAllUsers);

/** POST Methods */

router.route("/registerMail").post(registerMail); // send the email
router.route("/authenticate").post(verifyUser, (req, res) => res.end()); // authenticate user
router.route("/login").post(verifyUser, login); // login in app

/** GET Methods */
router.route("/user/:username").get(getUser); // user with username
router.route("/generateOTP").get(verifyUser, localVariables, generateOTP); // generate random OTP
router.route("/verifyOTP").get(verifyUser, verifyOTP); // verify generated OTP
router.route("/createResetSession").get(createResetSession); // reset all the variables

/** PUT Methods */
router.route("/updateuser").put(Auth, updateUser); // is use to update the user profile
router.route("/resetPassword").put(verifyUser, resetPassword); // use to reset password

module.exports = router;
