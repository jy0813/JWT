const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");

router.post("/signup", signUp); //signup 이라는 미들웨어를 signup 의 주소와 연결 시켜준다. 즉 front-end 클라이언트서버는 홈페이지주소/auth/signup 으로 회원가입 요청을 보낼 수 있게 된다.
router.post("/signin", signIn);

router.get("/signup", (req, res) => {
  res.send("회원가입");
});
module.exports = router;
