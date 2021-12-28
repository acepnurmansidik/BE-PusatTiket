const Venue = require("./model");

module.exports = {
  viewVenue: async (req, res) => {
    try {
      let venues = await Venue.find();
      res.render("admin/Venue/viewVenue", {
        title: `Admin | Venue`,
        venues,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  viewAddVenue: async (req, res) => {
    try {
      res.render("admin/Venue/addVenue", {
        title: `Admin | Venue`,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionAddVenue: async (req, res) => {
    try {
      const { location, address } = req.body;
      let venue = await Venue({ location, address });
      await venue.save();
      res.redirect("/venue");
    } catch (err) {
      console.log(err.message);
    }
  },
};
