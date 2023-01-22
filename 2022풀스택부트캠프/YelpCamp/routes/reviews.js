const express = require("express");
const router = express.Router({ mergeParams: true }); // 라우터 호출이 안뜰때 파라미터를 합성시킨다 *** 중요!!

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

const catchAsync = require("../utils/catchAsync");
const { createReview, deleteReview } = require("../controllers/reviews");

router.post("/", isLoggedIn, validateReview, catchAsync(createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

module.exports = router;
