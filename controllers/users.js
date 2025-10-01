const User = require("../models/users.js");

module.exports.signUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);

    // if registerUser is null/undefined, handle before login
    if (!registerUser) {
      req.flash("danger", "User is not registered");
      return res.redirect("/listing");
    }

    // Only redirect ONCE inside req.login
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Airbnb-Clone");
      return res.redirect("/listing");
    });
  } catch (err) {
    next(err);
  }
};

module.exports.loginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Airbnb-Clone");
  let redirectUrl = res.locals.redirecturl || "/listing";
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listing");
  });
};
