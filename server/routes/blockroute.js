const { postBlock, getBlocks,postBlocks,updateBlocks,deleteBlocks } = require("../controllers/blocks.controller");
const express = require("express");
const router = express.Router();

router.post("/saveBlock", postBlock);
router.post("/get", getBlocks);
router.post("/saveBlocks", postBlocks);
router.post("/updateBlocks", updateBlocks);
router.post("/deleteBlocks", deleteBlocks);


module.exports = router;
