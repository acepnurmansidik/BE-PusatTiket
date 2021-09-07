const mongoose = require("mongoose");

const schemaUser = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name cannot be empty!"],
  },
  ttl: {
    type: Date,
    require: [true, "TTL cannot be empty!"],
  },
  role: {
    type: String,
    enum: ["Admin", "Employee", "Developer"],
    default: "Employee",
  },
  status: {
    type: String,
    enum: ["enable", "disable"],
    default: "disable",
  },
  gender: {
    type: String,
    enum: ["Pria", "Wanita"],
    require: [true, "Gender cannot be empty"],
  },
  address: {
    type: String,
    require: [true, "Address cannot be empty"],
  },
  phoneNumber: {
    type: Number,
    require: [true, "Phone number cannot be empty!"],
  },
  thumbnail: {
    type: String,
    require: [true, "Image cannot be empty"],
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  },
  password: {
    type: String,
    require: [true, "Password cannot be empty"],
    minlength: [6, "Min length password must be 9 - 13 character"],
    maxlength: [15, "Max length password must be 9 - 13 character"],
  },
  email: {
    type: String,
    require: [true, "Email cannot be empty"],
  },
});

module.exports = mongoose.model("User", schemaUser);
