const express = require("express");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://localhost:27017/authDemo")
  .then(() => {
    console.log("Mongo Connect!!");
  })
  .catch((error) => {
    console.log("Mongo Error!!");
    console.log(error);
  });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is homePage");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });

  await user.save();

  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    res.send("Welcommmme!!");
  } else {
    res.send("Try again");
  }
});

app.get("/secret", (req, res) => {
  res.send("This is Secret!!!");
});

app.listen(3000, () => {
  console.log("server 3000!!");
});
