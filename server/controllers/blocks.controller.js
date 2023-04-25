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
  console.log("block", block);
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
  //find blogs which have ids in the array
  Block.find({ key: { $in: req.body.blockIds } })
    .then((allBlocks) => {
      console.log("allBlocks", allBlocks);
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

  try {
    const Blocks = blocks.map((block) => {
      return new Block({
        _id: mongoose.Types.ObjectId(),
        key: block.key,
        type: block.type,
        img: block.img,
        Component: block.Component,
        Data: block.Data,
      });
    });
    console.log("Blocks", Blocks);
    const savedBlocks = await Block.insertMany(Blocks).catch((error) => {
      console.log(error);
    });

    const savedBlockKeys = savedBlocks.map((block) => block.key);
    res.status(201).json({ savedBlockKeys });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// async function updateBlocks(req, res) {
//   const updatedBlocks = req.body.blocks;
//   console.log("updatedBlocks", updatedBlocks);

//   try {
//     const updatedBlockKeys = [];
//     const newBlocks = [];

//     for (const block of updatedBlocks) {
//       console.log("block", block)
//       const foundBlock = await Block.findOneAndUpdate(
//         { key: block.key },
//         { $set: block }
//       );
      
//       if (foundBlock) {
//         updatedBlockKeys.push(foundBlock.key);
//          console.log("foundBlock", foundBlock);
//       } else {
//         const newBlock = new Block({
//           _id: mongoose.Types.ObjectId(),
//           key: block.key,
//           type: block.type,
//           img: block.img,
//           Component: block.Component,
//           Data: block.Data,
//         });
//         const savedBlock = await newBlock.save();
//         updatedBlockKeys.push(savedBlock.key);
//         newBlocks.push(savedBlock);
//       }
//     }
//     console.log("updatedBlockKeys", updatedBlockKeys);

//     res.json({ updatedBlockKeys, newBlocks });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// }

async function updateBlocks(req, res) {
  const updatedBlocks = req.body.blocks;
  console.log("updatedBlocks", updatedBlocks);

  try {
    const updatedBlockKeys = [];
    const newBlocks = [];

    for (const block of updatedBlocks) {
      console.log("block", block)
      const foundBlock = await Block.findOneAndUpdate(
        { key: block.key },
        { $set: block },
        { new: true, upsert: true } // add options to create new blocks if not found
      );
      
      updatedBlockKeys.push(foundBlock.key);
      newBlocks.push(foundBlock); // push updated or new block to newBlocks array
    }
    console.log("updatedBlockKeys", updatedBlockKeys);

    res.json({ updatedBlockKeys, newBlocks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}


async function deleteBlocks(req, res) {
  const { keepKeys } = req.body;

  try {
    const deletedBlocks = await Block.deleteMany({
      key: { $nin: keepKeys },
    }).exec();
    res.json({ deletedBlocks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteBlocks,
  postBlock,
  getBlocks,
  postBlocks,
  updateBlocks,
};
