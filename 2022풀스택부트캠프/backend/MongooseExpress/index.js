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

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  //console.log(products);
  res.render("products/index", { products }); // 랜더링을 위한 두번째 인수
});



app.listen(3000, () => {
  console.log("App is litening 3000");
});
