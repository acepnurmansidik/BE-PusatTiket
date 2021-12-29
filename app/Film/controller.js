const Film = require("./model");
const Genre = require("../Genre/model");

module.exports = {
  viewFilm: async (req, res) => {
    try {
      let films = await Film.find();
      res.render("admin/Film/viewFilm", {
        title: `Admin | Film`,
        films,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  viewAddFilm: async (req, res) => {
    try {
      let genres = await Genre.find();
      res.render("admin/Film/addFilm", {
        title: `Admin | Create Film`,
        genres,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionAddFilm: async (req, res) => {
    try {
      const {
        title,
        actor,
        synopsis,
        director,
        writter,
        rating,
        genres,
        category,
      } = req.body;

      let film = await Film({
        title,
        actor,
        synopsis,
        director,
        writter,
        rating,
        genres,
        category,
      });
      await film.save();
      res.redirect("/film");
    } catch (er) {
      console.log(err.message);
    }
  },
  viewDetailFilm: async (req, res) => {
    try {
      const { id } = req.params;

      let film = await Film.findOne({ _id: id });
      let genres = await Genre.find();
      res.render("admin/Film/detailFilm", {
        title: `Admin | Detail Film`,
        film,
        genres,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
