const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // header에서 토큰 가져오기
  // header에서 x-auth-token 은 token의 key 값
  // token에는 JWT가 들어감
  const token = req.header("x-auth-token");

  //토큰 없는지 체크하기

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    // token 유효성 확인 , token을 만들 때 설정한 secret key 값 : jwtSecret
    const decoded = jwt.verify(token, "jwtSecret");
    // req에 user 정보 생성
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
