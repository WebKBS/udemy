const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "에러가 발생했습니다."], // 커스텀 에러 메세지
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy", "mushrooms", "fungi"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
