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
// const bike = new Product({
//   name: "Tire Pump",
//   price: 19.5,
//   categories: ["Cycling"],
// });
// bike
//   .save()
//   .then((data) => {
//     console.log("Success!!");
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//     console.log("Error!!!!");
//   });

Product.findOneAndUpdate(
  { name: "Tire Pump" },
  { price: -19.99 },
  { new: true, runValidators: true } // find메서드에서는 runValidators true를 넣어줘야 유효성 검사가 가능하다.
)
  .then((data) => {
    console.log("Success!!");
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
    console.log("Error!!!!");
  });
