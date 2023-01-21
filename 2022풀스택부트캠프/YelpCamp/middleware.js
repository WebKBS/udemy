const ExpressError = require("./utils/expressError");
const { campgroundSchema, reviewSchema } = require("./schemas");
const Campground = require("./models/campground");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // isAuthenticated 증명하다. 로그인하지 않으면 redirect시킨다.

    req.session.returnTo = req.originalUrl;
    req.flash("Error", "You must be signed in first");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);

  // 사용자가 아니면 접속할수 없다.
  if (!campground.author.equals(req.user._id)) {
    req.flash("Error", "사용자가 아닙니다!!!!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  // 사용자가 아니면 접속할수 없다.
  if (!review.author.equals(req.user._id)) {
    req.flash("Error", "사용자가 아닙니다!!!!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
