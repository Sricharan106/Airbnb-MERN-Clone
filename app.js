if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const UserRouter = require("./routes/user.js");
const setupMiddlewares = require("./middlewares/middlewares.js");

const app = express();

//  Apply all middlewares in one line
setupMiddlewares(app);

// MongoDB Connection
localUrl = "mongodb://127.0.0.1:27017/airbnb";
altasUrl = process.env.ATLASDB_URL;
mongoose
  .connect(altasUrl)
  .then(() => console.log("Connection successful"))
  .catch((err) => console.error(err));

// Routes
app.get("/", (req, res) => {
  res.redirect("/listing");
});

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/", UserRouter);

// Error handling
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { statusCode, message });
});

// Start server
app.listen(8080, () => console.log("App listening on port 8080"));
