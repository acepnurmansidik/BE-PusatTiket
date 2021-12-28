const mongoose = require("mongoose");

const schemaVenue = mongoose.Schema({
  location: {
    type: String,
    require: [true, "Location cannot be empty!"],
  },
  address: {
    type: String,
    require: [true, "Address cannot be empty!"],
  },
});

module.exports = mongoose.model("Venue", schemaVenue);
