const mongoose = require("mongoose");

const schemaTicket = mongoose.Schema({
  film: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, "Filmm cannot be empty!"],
    ref: "Film",
  },
  nominal: {
    type: mongoose.Schema.Types.ObjectId,
    require: [true, "Nominal cannot be empty!"],
    ref: "Nominal",
  },
  seatNumber: {
    type: Number,
    require: [true, "Seat cannot be empty!"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Ticket", schemaTicket);
