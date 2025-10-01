const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn } = require("../middlewares/islogin.js");
const { isAuthor } = require("../middlewares/isowner.js");
const { reviewListing } = require("../middlewares/validation.js");
const rewiveContrller = require("../controllers/reviews.js");

// post Route
router.post(
  "/",
  isLoggedIn,
  reviewListing,
  wrapAsync(rewiveContrller.createNewReview)
);

// Delete Reviw Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(rewiveContrller.destroyReview)
);

module.exports = router;
