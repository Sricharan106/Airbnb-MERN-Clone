const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares/islogin.js");
const reeviewController = require("../controllers/users.js");

router
  .route("/signup")
  .get(reeviewController.signUpForm)
  .post(wrapAsync(reeviewController.signUp));

// login
router
  .route("/login")
  .get(reeviewController.loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    reeviewController.login
  );

// logout
router.get("/logout", reeviewController.logOut);
module.exports = router;
