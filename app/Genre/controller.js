const Genre = require("./model");

module.exports = {
  viewGenre: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      let genres = await Genre.find();

      res.render("admin/Genre/viewGenre", {
        title: `Admin | Genre`,
        genres,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    }
  },
  viewAddGenre: async (req, res) => {
    try {
      res.render("admin/Genre/addGenre", {
        title: `Admin | Create Genre`,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    }
  },
  actionAddGenre: async (req, res) => {
    try {
      const { name } = req.body;
      let genre = await Genre({ name });
      await genre.save();

      req.flash("alertMessage", `Succesfully create genre!`);
      req.flash("alertStatus", `success`);
      res.redirect("/genre");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    }
  },
  viewUpdateGenre: async (req, res) => {
    try {
      const { id } = req.params;
      let genre = await Genre.findOne({ _id: id });
      console.log(genre);
      res.render("admin/Genre/updateGenre", {
        title: `Admin | Update Genre`,
        genre,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    }
  },
  actionUpdateGenre: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Genre.findOneAndUpdate({ _id: id }, { name });
      req.flash("alertMessage", `Successfuly update genre!`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    }
  },
  actionDeleteGenre: async (req, res) => {
    try {
      const { id } = req.params;

      await Genre.findOneAndRemove({ _id: id });
      req.flash("alertMessage", `Successfuly delete genre!`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/genre");
    }
  },
};
