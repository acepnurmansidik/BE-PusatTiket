const mongoose = require("mongoose");

const schemaFilm = mongoose.Schema({
  title: {
    type: String,
    require: [true, "Title cannot be empty!"],
  },
  actor: {
    type: String,
    require: [true, "Actor cannot be empty!"],
  },
  synopsis: {
    type: String,
    require: [true, "Synopsis cannot be empty!"],
  },
  director: {
    type: String,
    require: [true, "Director cannot be emepty!"],
  },
  writter: {
    type: String,
    require: [true, "Writter cannot be emepty!"],
  },
  rating: {
    type: String,
    require: [true, "Rating cannot be emepty!"],
  },
  image: {
    type: String,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
});

module.exports = mongoose.model("Film", schemaFilm);
