const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63c1595138f4be9e5d78fb3e", // 사용자 지정
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatum sit, iste distinctio.",
      price,
      images: [
        {
          url:
            "https://res.cloudinary.com/diwmfvyd1/image/upload/v1674640710/YelpCamp/exjsk4yecqrpqpsuq9b2.jpg",
          filename: "YelpCamp/exjsk4yecqrpqpsuq9b2",
        },
        {
          url:
            "https://res.cloudinary.com/diwmfvyd1/image/upload/v1674640711/YelpCamp/lhzj2yg6inbulfr3lqss.jpg",
          filename: "YelpCamp/lhzj2yg6inbulfr3lqss",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
