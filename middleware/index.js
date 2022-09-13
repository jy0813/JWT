require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { errorGenerator } = require("../controllers/auth");
const secretKey = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  try {
    const token = req.get("Authroization"); // req(요청) 객체의 헤더의 값을 가지고 올 때에는 get 메소드를 사용하고 인자로 Key 값을 넘겨준다.
    const decodedToken = jwt.verify(token, secretKey); // 요청의 헤더에 담겨온 토큰을 만들 때 뿌려준 salt 값으로 복호화 한다.
    const { _id } = decodedToken; // 복호화된 토큰 객체에서 id 를 꺼낸다. (토큰을 만들 때 넣어준 id 가 들어있다.)
    const user = await User.findOne({ _id }); // user 조회
    if (!user) errorGenerator("Not found User", 404);

    req.user = user; // request 객체의 user 에 담아서 다른 기능을 하는 함수로 넘겨준다.
    next(); // next() 함수로 미들웨어를 연결 시켜야 요청의 맥락이 연결된다. 이 함수가 없으면 이 미들웨어에서 요청이 끊겨 버림.
  } catch (err) {
    err.message = "Not authenticated";
    err.statusCode = 401;
    next(err);
  }
};
