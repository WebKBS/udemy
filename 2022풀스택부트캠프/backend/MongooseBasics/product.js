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
    min: [0, "Price must be to positive ya dodo!"], // 에러시 에러메세지 표기 (커스텀 메세지)
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
  size: {
    type: String,
    enum: ["S", "M", "L"], // 여러개의 유효성 검사를 할때는 enum을 사용
  },
}); // Schema를 정하지 않는 데이터는 나타나지않는다.

productSchema.methods.greet = function () {
  console.log("Hellooooo");
  console.log(`- from ${this.name}`);
};

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Mountain Bike" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("Outdoors");
  console.log(foundProduct);
};

findProduct();

// const bike = new Product({
//   name: "Cycling Jersey",
//   price: 28.5,
//   categories: ["Cycling"],
//   size: "S",
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

// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { price: -19.99 },
//   { new: true, runValidators: true } // find메서드에서는 runValidators true를 넣어줘야 유효성 검사가 가능하다.
// )
//   .then((data) => {
//     console.log("Success!!");
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//     console.log("Error!!!!");
//   });
