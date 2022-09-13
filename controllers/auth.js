const User = require("../models/user"); // 위에서 설계한 User 정보를 담기위한 document 모델
const bcrypt = require("bcryptjs"); // 유저가 입력한 password 를 암호화 하기 위한 알고리즘 라이브러리

const createUserData = async (userInput) => {
  // user를 객체화하고 Database에 저장하는 함수
  const user = await userWithEncodePassword(userInput); // input 을 인자로 넘겨주고, 암호화된 정보가 담긴 객체를 결과로 받는다.
  return user.save(); // mongoose 의 save() 메소드를 통해서 Users 콜렉션에 document(객체) 저장하기
};

const userWithEncodePassword = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 12); // 비밀번호를 암호화 하는 함수
  const user = new User({
    // User 스키마를 사용해서 도큐먼트(객체)를 생성한다.
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

const errorGenerator = (message, statusCode = 500) => {
  // error 를 핸들링 하는 함수
  const error = new Error(message); // error 객체 생성
  error.statusCode = statusCode;
  throw error; //error를 핸들링 하는 하는 미들웨어로 에러를 던진다.
};

const signUp = async (req, res, next) => {
  //회원가입 로직
  try {
    const { email } = req.body; //POST 메소드로 들어온 요청의 데이터(body) 에서 email 을 destructuring 한다.
    const user = await User.findOne({ email }); // email 의 정보를 가지고 Users 콜렉션에서 조회한다.
    if (user) errorGenerator("email 중복입니다. 다시 입력해주세요", 404); // 중복 될 시에 에러 발생시킴

    await createUserData(req.body); // 위에서 정의한 함수로 POST메소드로 들어온 데이터(body)를 보낸다.
    res.status(201).json({ message: "User 생성 완료" }); // user가 생성되었다는 메세지를 응답으로 보낸다.
  } catch (err) {
    next(err); // 에러를 catch 해서 에러를 핸들링 하는 미들웨어에서 처리하도록 한다.
  }
};

module.exports = { signUp }; // signUp 함수를 module 로 내보낸다.
