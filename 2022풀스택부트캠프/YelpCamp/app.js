if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// console.log(process.env.SECRET);
// console.log(process.env.API_KEY);

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/expressError");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const helmet = require("helmet");

const usersRoutes = require("./routes/users");
const campgroundsRoutes = require("./routes/campgrounds");
const reviewsRoutes = require("./routes/reviews");
//const dbUrl = process.env.DB_URL;

const mongoSanitize = require("express-mongo-sanitize");

//"mongodb://localhost:27017/yelp-camp"
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  //useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // url 인코드
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // 등록된 폴더 js파일을 불러올수 있음
app.use(mongoSanitize());

const sessionConfig = {
  secret: "thisshouldbesecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // http라서 자바스크립트만으로는 사용할수 없다.
    //secure: true, // http2 의 상태에서만 로그인 가능하다.
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user; // 로그인 접속하면 로그인과 회원가입을 없애고 로그아웃만 남긴다.
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("Error");
  next();
});

app.use("/", usersRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

// all은 어느곳에서든 에러가 났을때 전체 처리한다.
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
  //res.send("ALL!!!!!! 404!!!");
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "On no Something Went wrong";
  res.status(statusCode).render("error", { err });
  //res.send("Oh no Error!!!!!!!!!");
});

app.listen(4000, () => {
  console.log("serving on port 4000");
});



// 부트캠프 완료