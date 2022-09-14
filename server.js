const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API Running");
});

connectDB();

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));
