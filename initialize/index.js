const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const User = require("../models/users.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
  console.log("Connection successful");

  // 1️⃣ Create user first
  await User.findOneAndDelete({ username: "demo" });

  const newUser = new User({
    email: "sric29356@gmail.com",
    username: "demo",
  });

  await User.register(newUser, "password123");
  const ownerData = await User.findOne({ username: "demo" });

  const ownerId = ownerData._id; // already an ObjectId
  console.log("Owner ID:", ownerId);

  // 2️⃣ Insert listings with correct owner
  await Listing.deleteMany({});
  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: ownerId, // no need for new ObjectId()
    geometry: {
      type: "Point",
      coordinates: [78.4772, 17.4065],
    },
  }));
  await Listing.insertMany(listingsWithOwner);

  console.log(listingsWithOwner)
  console.log("Data is saved");
}

main().catch(console.error);
