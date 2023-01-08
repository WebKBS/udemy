const bcrypt = require("bcrypt");

// const hashPassword = async (pw) => {
//   const salt = await bcrypt.genSalt(12);
//   const hash = await bcrypt.hash(pw, salt);
//   console.log(salt);
//   console.log(hash);
// };

const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 12); //12는 해독 시간 : 보통 12 사용

  console.log(hash);
};

const login = async (pw, hashPw) => {
  const result = await bcrypt.compare(pw, hashPw); // 패스워드가 일치하는지 확인
  if (result) {
    console.log("로그인 성공!!");
  } else {
    console.log("로그인 실패");
  }
};

hashPassword("monkey");
login("monkey", "$2b$12$jsgEFYGrf/Z5t/OZR.auYOx5UMVyRyL.9lIqMUL7U1iwRGzaNkadi");
