// basic
require("dotenv").config();

// db
const connectDB = require("./db/connect");
const user = require("./db/user");

// server
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");

// utility middleware
app.use(express.json());

// start server

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`servr is listening ${port}`);
    });
  } catch (e) {
    console.log(`error has ${e}`);
  }
};

start();
