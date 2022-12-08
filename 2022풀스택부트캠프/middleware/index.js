// https://expressjs.com/ko/guide/writing-middleware.html 미들웨어 작성 방법

const express = require("express");
const app = express();
const morgan = require("morgan");

//morgan("tiny");

app.use(morgan("dev")); // 요청 응답을 받고 종료한 시간 및 요청상태 코드를 콘솔에 표시해준다.

// app.use((req, res) => {
//   res.send("HI JACK My App.Use"); // 아무 주소나 쳐도 요청된다..
// });

app.use((req, res, next) => {
  console.log("MiddleWare Used!!! First");
  next(); // 미들웨어 사용  **** 다음 미들웨어를 사용하려면 next()를 반드시 써줘야한다. next()를 사용하지않으면 다음은 실행되지 않음
  // console은 나오지만, 페이지 요청은 불가능하다.

  console.log("MiddleWare - After Calling"); // next() 다음에 온 요청은 가장 마지막에 나타난다.
});

app.use((req, res, next) => {
  console.log("MiddleWare Used!!! Second");
  next();
});

app.use((req, res, next) => {
  console.log("MiddleWare Used!!! Third");
  return next();
  console.log("return After"); // 실행되지 않는다.
});

app.use((req, res, next) => {
  console.log("MiddleWare Used!!! Four");
  next();
});

// app.use(() => {
//   console.log("HEy!!!!!"); // 요청, 응답이 종료되지 않는다.
// });

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/dogs", (req, res) => {
  res.send("Woof Woof!");
});

app.listen(3000, () => {
  console.log("3000!!!!!");
});
