const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const EspressError = require("./utils/expressError");
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const ExpressError = require("./utils/expressError");

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

const app = express();
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // url 인코드
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get(
  "/campgrounds",
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

// :id 보다 아래 있으면 안된다. 순서가 먼저 있어야 한다.
app.get(
  "/campgrounds/new",
  catchAsync(async (req, res) => {
    res.render("campgrounds/new");
  })
);

app.post(
  "/campgrounds",
  catchAsync(async (req, res, next) => {
    if (!req.body.campground)
      throw new ExpressError("Invalid Campground Data", 404); // 따로 에러메세지 지정하기, 포스트맨에서 확인가능
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

// all은 어느곳에서든 에러가 났을때 전체 처리한다.
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
  //res.send("ALL!!!!!! 404!!!");
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).send(message);
  res.send("Oh no Error!!!!!!!!!");
});

app.listen(4000, () => {
  console.log("serving on port 4000");
});
