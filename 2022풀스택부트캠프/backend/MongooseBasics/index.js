const mongoose = require("mongoose"); //27017 기본 포트
mongoose
  .connect("mongodb://localhost:27017/movieApp")
  .then(() => {
    console.log("Connection Open");
  })
  .catch((error) => {
    console.log(error);
  });
