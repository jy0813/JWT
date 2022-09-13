const express = require("express");
const router = require("./routes");
const app = express();

router = require("./routes/index");
router(app);

module.exports = app;
