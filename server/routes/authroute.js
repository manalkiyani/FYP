const express = require("express");
const { register, login,getAllUsers } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/", login);
router.get('/getUsers',getAllUsers)

module.exports = router;
