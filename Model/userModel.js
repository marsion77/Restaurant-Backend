const mongoose = require("mongoose");

const userdetails = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true }
});

const userModel = mongoose.model("cleints", userdetails);
module.exports = userModel;
