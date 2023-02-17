/*jshint esversion: 6 */
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

async function register(req, res) {
  var salt =  bcrypt.genSaltSync(10);
  var hash =   bcrypt.hashSync(req.body.password, salt).toString();

  const newUser = new Admin({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,

    password: hash,
  });

  try {
    const user = await newUser.save();

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
async function login(req, res) {
  try {
    const user = await Admin.findOne({ username: req.body.username });
    console.log(user);
    !user && res.status(401).json("Wrong password okk or username");

    const result = await bcrypt.compare(req.body.password, user.password);
    !result && res.status(401).json("Wrong password or username");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );
    const { password, ...info } = user._doc;

    res.status(200).json({
      ...info,
      accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
//get all users
async function getAllUsers(req, res) {
  try {
    const users = await Admin.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
module.exports = {
  register,
  login,
  getAllUsers,
};
