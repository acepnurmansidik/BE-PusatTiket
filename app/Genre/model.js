const mongoose = require("mongoose");

let genreSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name cannot be empty"],
  },
});
module.exports = mongoose.model("Genre", genreSchema);
