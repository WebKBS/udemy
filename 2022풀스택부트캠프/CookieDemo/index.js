const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser("thisismysecret"));

app.get("/greet", (req, res) => {
  const { name = "No-name" } = req.cookies;
  res.send(name);
});

app.get("/setname", (req, res) => {
  res.cookie("name2", "stevie");
  res.send("Your Cookie");
});

app.get("/getcookies", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send("get Cookies!!");
});

app.get("/verifyfruit", (req, res) => {
  // console.log(req.cookies);
  // res.send(req.cookies);
  console.log(req.signedCookies); //signedCookies 서명된 쿠키 호출
  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log("3000 Port!!");
});
