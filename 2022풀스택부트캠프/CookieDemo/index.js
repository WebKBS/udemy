const express = require("express");
const app = express();

app.get("/greet", (req, res) => {
  res.send("Hey There!!!");
});

app.get("/setname", (req, res) => {
  res.cookie("name2", "stevie");
  res.send("Your Cookie");
});

app.listen(3000, () => {
  console.log("3000 Port!!");
});
