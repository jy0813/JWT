const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json({ extended: false })); // .urlencoded()은 x-www-form-urlencoded형태의 데이터를, .json()은 JSON형태의 데이터를 해석해줌

app.get("/", (req, res) => {
  res.send("API Running");
});

connectDB();

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));

app.use("/api/register", require("./routes/api/register"));
