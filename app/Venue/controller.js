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
        title: `Admin | Create Venue`,
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
  viewEditVenue: async (req, res) => {
    try {
        const {id}=req.params
        let venue = await Venue.findOne({_id:id})
      res.render("admin/Venue/updateVenue", {
        title: `Admin | Update Venue`,
        venue
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionEditVenue:async(req, res)=>{
      try {
          const {id}=req.params
          const {location, address}=req.body

          await Venue.findOneAndUpdate({_id:id},{location, address})
          res.redirect("/venue")
      } catch (err) {
          console.log(err.message);
      }
  },
  actionDeleteVenue: async(req, res)=>{
      try {
          const {id}=req.params
          await Venue.findOneAndRemove({_id:id})
          res.redirect("/venue")
      } catch (err) {
          console.log(err.message);
      }
  }
};
