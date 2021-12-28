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
};
