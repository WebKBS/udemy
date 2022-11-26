// product 가정
const mongoose = require("mongoose"); //27017 기본 포트
mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("Connection Open");
  })
  .catch((error) => {
    console.log(error);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
}); // Schema를 정하지 않는 데이터는 나타나지않는다.

const Product = mongoose.model("Product", productSchema);
const bike = new Product({
  name: "Bike Helmet",
  price: 29.5,
  categories: ["Cycling", "safety"],
});
bike
  .save()
  .then((data) => {
    console.log("Success!!");
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
    console.log("Error!!!!");
  });
