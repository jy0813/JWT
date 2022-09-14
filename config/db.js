// package
const mongoose = require("mongoose");
require("dotenv").config();
// URI
const uri = process.env.DB_URL;

//Connect MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true, // Enables the new unified topology layer
      useNewUrlParser: true, // deprecatedError 오류 방지
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
