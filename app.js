const express = require("express");
const router = require("./routes/index");
const app = express();

router(app);

module.exports = app;
