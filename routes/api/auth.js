const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

/**
 * @route Get api/auth
 * @desc Auth
 * @access Public
 */

router.get("/", auth, async (req, res) => {
  try {
    // auth 미들웨어에서 생성해준 req.user를 사용하여 DB에서 user 탐색. 패스워드에 대한 내용은 제외합니다.
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
