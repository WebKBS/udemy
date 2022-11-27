// person 가정
const mongoose = require("mongoose"); //27017 기본 포트
mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Connection Open");
  })
  .catch((error) => {
    console.log(error);
  });

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

const Person = mongoose.model("Person", personSchema);

