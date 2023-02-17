/*jshint esversion: 6 */
const Block = require("../models/Block");
const mongoose = require("mongoose");

async function postBlock(req, res) {
  const block = new Block({
    _id: mongoose.Types.ObjectId(),
    type: req.body.type,
    img: req.body.img,
    Component: req.body.Component,
    Data: req.body.Data,
  });
  return block
    .save()
    .then((newBlock) => {
      return res.status(201).json({
        success: true,
        message: "New block created successfully",
        Block: newBlock,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

//get Blocks from a specified array of ids
async function getBlocks(req, res) {
  console.log("Req.body", req.body.blockIds);

  //find blogs which have ids in the array
  Block.find({ key: { $in: req.body.blockIds } })
    .then((allBlocks) => {
      return res.status(200).json({
        success: true,
        message: "A list of all blocks",
        Blocks: allBlocks,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
module.exports = {
  postBlock,
  getBlocks,
};
