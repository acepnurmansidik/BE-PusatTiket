const mongoose = require("mongoose");

const schemaNominal = mongoose.Schema({
  typeName: {
    type: String,
    require: [true, "Ticet name connet be empty!"],
  },
  price: {
    type: String,
    require: [true, "Price cannot be empty!"],
  },
});

module.exports = mongoose.model("Nominal", schemaNominal);
