const Nominal = require("./model");

module.exports = {
  viewNominal: async (req, res) => {
    try {
      let nominals = await Nominal.find();
      res.render("admin/Nominal/viewNominal", {
        title: `Admin | Nominal`,
        nominals,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  viewAddNominal: async (req, res) => {
    try {
      res.render("admin/Nominal/readNominal", {
        title: `Admin | Create Nominal`,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionAddNominal: async (req, res) => {
    try {
      const { typeName, price } = req.body;
      let nominal = await Nominal({ typeName, price });
      await nominal.save();
      res.redirect("/nominal");
    } catch (err) {
      console.log(err.message);
    }
  },
  viewEditNominal: async (req, res) => {
    try {
      const { id } = req.params;
      let nominal = await Nominal.findOne({ _id: id });
      res.render("admin/Nominal/updateNominal", {
        title: `Admin | Update Nominal`,
        nominal
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionEditNominal: async (req, res) => {
    try {
      const { id } = req.params;
      const { typeName, price } = req.body;

      await Nominal.findOneAndUpdate({ _id: id }, { typeName, price });
      res.redirect("/nominal");
    } catch (err) {
      console.log(err.message);
    }
  },
  actionDeleteNominal: async (req, res) => {
    try {
      const { id } = req.params;

      await Nominal.findOneAndRemove({ _id: id });
      res.redirect("/nominal");
    } catch (err) {
      console.log(err.message);
    }
  },
};
