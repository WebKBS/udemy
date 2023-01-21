const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const Campground = require("../models/campground");

router.get(
  "/",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
  })
);

// :id 보다 아래 있으면 안된다. 순서가 먼저 있어야 한다.
router.get(
  "/new",
  isLoggedIn,
  catchAsync(async (req, res) => {
    res.render("campgrounds/new");
  })
);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res, next) => {
    // if (!req.body.campground)
    //   throw new ExpressError("Invalid Campground Data", 404); // 따로 에러메세지 지정하기, 포스트맨에서 확인가능
    req.flash("success", "Successfully made a new campground");
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
      .populate("reviews")
      .populate("author");
    console.log(campground);
    if (!campground) {
      req.flash("error", "Cannot find that campground!");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Cannot find that campground!");
      return res.redirect("/campgrounds");
    }

    res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "Successfully update campground");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
      req.flash("Error", "사용자가 아닙니다!!!!");
      return res.redirect(`/campgrounds/${id}`);
    }
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully Deleted Campground");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
