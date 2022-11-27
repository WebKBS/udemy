const { equal } = require("assert");
const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose"); //27017 기본 포트

const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((error) => {
    console.log(error);
    console.log("Mongo Error");
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/dog", (req, res) => {
  res.send("Helllllo");
});

app.listen(3000, () => {
  console.log("App is litening 3000");
});
