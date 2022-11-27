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

personSchema.pre("save", async function () {
  this.first = "Yo";
  this.last = "MAMA";
  console.log("About To save");
});
personSchema.post("save", async function () {
  console.log("just saved!!");
});

const Person = mongoose.model("Person", personSchema);
