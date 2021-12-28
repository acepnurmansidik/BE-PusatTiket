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
};
