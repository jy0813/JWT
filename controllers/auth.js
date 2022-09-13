const User = require("../models/user"); // 위에서 설계한 User 정보를 담기위한 document 모델
const bcrypt = require("bcryptjs"); // 유저가 입력한 password 를 암호화 하기 위한 알고리즘 라이브러리

const createUserData = async (userInput) => {
  // user를 객체화하고 Database에 저장하는 함수
  const user = await userWithEncodePassword(userInput); // input 을 인자로 넘겨주고, 암호화된 정보가 담긴 객체를 결과로 받는다.
  return user.save(); // mongoose 의 save() 메소드를 통해서 Users 콜렉션에 document(객체) 저장하기
};

const userWithEncodePassword = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 12); // 비밀번호를 암호화 하는 함수
};
