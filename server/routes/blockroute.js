const { postBlock, getBlocks,postBlocks } = require("../controllers/blocks.controller");
const express = require("express");
const router = express.Router();

router.post("/saveBlock", postBlock);
router.post("/get", getBlocks);
router.post("/saveBlocks", postBlocks);


module.exports = router;
