const authRoutes = require("./auth");

const router = (app) => {
  app.use("/auth", authRoutes); // 인증/인가와 관련된 미들웨어로 연결시키기 위해 홈페이지주소/auth/ 의 길로 안내하는 코드.
};

module.exports = router;
