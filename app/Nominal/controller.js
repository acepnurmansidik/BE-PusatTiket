const Nominal = require("./model");

module.exports = {
  viewNominal: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      let nominals = await Nominal.find();
      res.render("admin/Nominal/viewNominal", {
        title: `Admin | Nominal`,
        nominals,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  viewAddNominal: async (req, res) => {
    try {
      res.render("admin/Nominal/readNominal", {
        title: `Admin | Create Nominal`,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionAddNominal: async (req, res) => {
    try {
      const { typeName, price } = req.body;
      let nominal = await Nominal({ typeName, price });
      await nominal.save();

      req.flash("alertMessage", `Successfuly create nominal!`);
      req.flash("alertStatus", `success`);
      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  viewEditNominal: async (req, res) => {
    try {
      const { id } = req.params;
      let nominal = await Nominal.findOne({ _id: id });
      res.render("admin/Nominal/updateNominal", {
        title: `Admin | Update Nominal`,
        nominal,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionEditNominal: async (req, res) => {
    try {
      const { id } = req.params;
      const { typeName, price } = req.body;

      await Nominal.findOneAndUpdate({ _id: id }, { typeName, price });

      req.flash("alertMessage", `Successfuly update nominal!`);
      req.flash("alertStatus", `success`);
      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionDeleteNominal: async (req, res) => {
    try {
      const { id } = req.params;

      await Nominal.findOneAndRemove({ _id: id });

      req.flash("alertMessage", `Successfuly delete nominal!`);
      req.flash("alertStatus", `success`);
      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
};
