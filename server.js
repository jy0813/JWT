const app = require("./app");
const http = require("http"); // http 내장 모듈
const server = http.createServer(app); // http 모듈의 createServer 함수를 통해서 express app을 사용한 서버를 만든다.
const mongoose = require("mongoose");
const url = process.env.DB_URL;
const port = process.env.PORT || 6000;

(async function () {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("DB CONNECTED");
    server.listen(port, () => {
      console.log(`servr is listening ${port}`);
    });
  } catch (err) {
    console.log("DB CONNECTION ERROR");
    console.log(`error has ${err}`);
  }
})(); // 서버를 실행시키는 익명함수를 생성하자마자 실행시킨다.
