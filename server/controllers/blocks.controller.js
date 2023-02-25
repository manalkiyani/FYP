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
  console.log("fucking here");
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

//save a list of blocks
async function postBlocks(req, res) {
  const blocks = req.body.blocks;
  console.log(blocks);
  try {
    const Blocks = blocks.map((block) => {
      return new Block({
        _id: mongoose.Types.ObjectId(),
        key: "alala",
        type: block.type,
        img: block.img,
        Component: block.Component,
        Data: block.Data,
        fuck: "fuck",
      });
    });
    console.log("Before insertMany:", Blocks);
    const savedBlocks = await Block.insertMany(Blocks).catch((error) => {
      console.log(error);
    });
    console.log("After insertMany:", savedBlocks);
    const savedBlockIds = savedBlocks.map((block) => block._id);
    res.status(201).json({ savedBlockIds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  postBlock,
  getBlocks,
  postBlocks,
};
