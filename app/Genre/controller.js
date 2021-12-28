const Genre = require("./model");

module.exports = {
  viewGenre: async (req, res) => {
    try {
      let genres = await Genre.find();
      res.render("admin/Genre/viewGenre", {
        title: `Admin | Genre`,
        genres,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  viewAddGenre: async (req, res) => {
    try {
      res.render("admin/Genre/addGenre", {
        title: `Admin | Create Genre`,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionAddGenre: async (req, res) => {
    try {
      const { name } = req.body;
      let genre = await Genre({ name });
      await genre.save();

      res.redirect("/genre");
    } catch (err) {
      console.log(err.message);
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
      console.log(err.message);
    }
  },
  actionUpdateGenre: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Genre.findOneAndUpdate({ _id: id }, { name });
      res.redirect("/genre");
    } catch (err) {
      console.log(err.message);
    }
  },
  actionDeleteGenre: async (req, res) => {
    try {
      const { id } = req.params;

      await Genre.findOneAndRemove({ _id: id });
      res.redirect("/genre");
    } catch (err) {
      console.log(err.message);
    }
  },
};
