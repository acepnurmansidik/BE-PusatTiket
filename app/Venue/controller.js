const Venue = require("./model");

module.exports = {
  viewVenue: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      let venues = await Venue.find();
      res.render("admin/Venue/viewVenue", {
        title: `Admin | Venue`,
        venues,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/venue");
    }
  },
  viewAddVenue: async (req, res) => {
    try {
      res.render("admin/Venue/addVenue", {
        title: `Admin | Create Venue`,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/venue");
    }
  },
  actionAddVenue: async (req, res) => {
    try {
      const { location, address } = req.body;
      let venue = await Venue({ location, address });
      await venue.save();

      req.flash("alertMessage", `Successfuly create venue!`);
      req.flash("alertStatus", `danger`);
      res.redirect("/venue");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/venue");
    }
  },
  viewEditVenue: async (req, res) => {
    try {
      const { id } = req.params;
      let venue = await Venue.findOne({ _id: id });
      res.render("admin/Venue/updateVenue", {
        title: `Admin | Update Venue`,
        venue,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/venue");
    }
  },
  actionEditVenue: async (req, res) => {
    try {
      const { id } = req.params;
      const { location, address } = req.body;

      await Venue.findOneAndUpdate({ _id: id }, { location, address });

      req.flash("alertMessage", `Successfult update venue!`);
      req.flash("alertStatus", `success`);
      res.redirect("/venue");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/venue");
    }
  },
  actionDeleteVenue: async (req, res) => {
    try {
      const { id } = req.params;
      await Venue.findOneAndRemove({ _id: id });

      req.flash("alertMessage", `Successfuly delete venue!`);
      req.flash("alertStatus", `success`);
      res.redirect("/venue");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/venue");
    }
  },
};
