const express = require("express");
const app = express();
const morgan = require("morgan");

//morgan("tiny");

app.use(morgan("dev")); // 요청 응답을 받고 종료한 시간 및 요청상태 코드를 콘솔에 표시해준다.

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
