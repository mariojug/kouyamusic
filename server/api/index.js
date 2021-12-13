require("dotenv").config({ path: require("find-config")(".env") });

const express = require("express");
const beatstore = require("./routes/beatstore");

const router = express.Router();

router.use("/beatstore", beatstore);

module.exports = router;
