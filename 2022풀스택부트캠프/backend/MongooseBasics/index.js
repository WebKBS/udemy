// 영화앱을 가정

const mongoose = require("mongoose"); //27017 기본 포트
mongoose
  .connect("mongodb://localhost:27017/movieApp")
  .then(() => {
    console.log("Connection Open");
  })
  .catch((error) => {
    console.log(error);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);
// const amadeus = new Movie({
//   title: "Amadeus",
//   year: 1986,
//   score: 9.2,
//   rating: "R",
// });

// Movie.insertMany([
//   { title: "Amelie", year: 2001, score: 8.3, rating: "R" },
//   { title: "Alien", year: 1979, score: 8.1, rating: "R" },
//   { title: "The Iron Giant", year: 1999, score: 7.5, rating: "PG" },
//   { title: "Stand By me", year: 1986, score: 8.6, rating: "R" },
//   { title: "Moonrise Kingdom", year: 2012, score: 7.3, rating: "PG-13" },
// ]).then((data) => {
//   console.log("It Worked");
//   console.log(data);
// });
