const express = require("express");
const router = express.Router({ mergeParams: true }); // 라우터 호출이 안뜰때 파라미터를 합성시킨다 *** 중요!!
const Review = require("../models/review");
const Campground = require("../models/campground");
const { validateReview } = require("../middleware");

const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created new review");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully Deleted Review");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
