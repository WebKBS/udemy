// express를 불러옴
const express = require("express");

// express 실행을 변수에 저장
const app = express();

// use 메서드는 요청이 들어오면 콜백
// 브라우저에서 보이진 않지만 새로고침하면 터미널에서 보인다.
app.use(() => {
  console.log("유즈 사용하기");
});

//express 실행
app.listen(3000, (e) => {
  console.log("LISTENING ON PROT 3000");
});

// app.listen(8080, (e) => {
//   console.log("LISTENING ON PROT 8080");
// });
