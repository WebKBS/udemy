const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/relationshopDemo")
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((error) => {
    console.log(error);
    console.log("Mongo Error");
  });

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

// const makeTweets = async () => {
//   //const user = new User({ username: "chikenfan99", age: 61 });
//   const user = await User.findOne({ username: "chickenfan99" });
//   const tweet2 = new Tweet({ text: "bock bock", likes: 100 });
//   tweet2.user = user;
//   user.save();
//   tweet2.save();
// };

// makeTweets();

const findTweet = async () => {
  //const t = await Tweet.findOne({})).populate("user", "username"); // 두번째 파라미터로 특정부분 보기
  const t = await Tweet.find({}).populate("user"); // 보든 부분 보기
  console.log(t);
};
findTweet();
