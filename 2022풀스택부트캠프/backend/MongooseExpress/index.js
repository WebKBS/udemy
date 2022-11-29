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
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  //console.log(products);
  res.render("products/index", { products }); // 랜더링을 위한 두번째 인수
});

app.get("/products/new", async (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  //res.send("making your product");
  res.redirect(`/products/${newProduct._id}`); // 리다이랙트 요청한 페이지로 바로이동
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

app.listen(3000, () => {
  console.log("App is litening 3000");
});
