const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/greet", (req, res) => {
  const { name = "No-name" } = req.cookies;
  res.send(name);
});

app.get("/setname", (req, res) => {
  res.cookie("name2", "stevie");
  res.send("Your Cookie");
});

app.listen(3000, () => {
  console.log("3000 Port!!");
});
