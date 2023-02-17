const { postBlock, getBlocks } = require("../controllers/blocks.controller");
const express = require("express");
const router = express.Router();

router.post("/add", postBlock);
router.post("/get", getBlocks);

module.exports = router;
