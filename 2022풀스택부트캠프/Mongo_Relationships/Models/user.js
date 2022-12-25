const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshopDemo")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((error) => {
    console.log(error);
    console.log("Mongo Error");
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { id: false }, // 자동으로 입력되는 id 끄는법
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });

  u.addresses.push({
    street: "123 Sesame St.",
    city: "New York",
    state: "Ny",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

// 새로운 주소를 추가하는 방법
const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "99 3rd St.",
    city: "New York",
    state: "Ny",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

//makeUser();
addAddress("63a83aeeaf47ac667c6b5e68");
