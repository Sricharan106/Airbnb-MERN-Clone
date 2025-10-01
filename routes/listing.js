const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn } = require("../middlewares/islogin.js");
const { isOwner } = require("../middlewares/isowner.js");
const listingController = require("../controllers/listing.js");
const { validateListing } = require("../middlewares/validation.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createNewListing)
  );

// Create Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Search
router.get("/search", wrapAsync(listingController.search));

// filtesr
router.get("/filter/:category", wrapAsync(listingController.filter))

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.editListing)
  )
  .get(wrapAsync(listingController.showAllListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editForm)
);

module.exports = router;
