const mongoose = require("mongoose");
const { Schema } = mongoose;

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name!"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

// ****** 모델을 만들고 내보내는 과정이 반드시!!!! 필요함
const Farm = mongoose.model("Farm", farmSchema);
module.exports = Farm;
