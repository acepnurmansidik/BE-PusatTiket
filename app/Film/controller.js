const Film = require("./model");
const Genre = require("../Genre/model");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  viewFilm: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      let films = await Film.find();
      res.render("admin/Film/viewFilm", {
        title: `Admin | Film`,
        films,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/film");
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
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/film");
    }
  },
  actionAddFilm: async (req, res) => {
    try {
      const payload = req.body;

      if (req.file) {
        // get file from uploaded
        let tmp_path = req.file.path;
        // take file extension
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        // concatenate filename with originalExt
        let filename = req.file.filename + "." + originalExt;
        // save to destination
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/film/${filename}`
        );

        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        // save file
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const film = new Film({ ...payload, thumbnail: filename });
            await film.save();

            req.flash("alertMessage", `Successfuly create new film`);
            req.flash("alertStatus", `success`);
            res.redirect("/film");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/film");
          }
        });
      } else {
        const film = await Film({ ...payload });
        await film.save();

        req.flash("alertMessage", `Suuccessfuly create new film`);
        req.flash("alertStatus", `success`);
        res.redirect("/film");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/film");
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
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/film");
    }
  },
  viewEditFilm: async (req, res) => {
    try {
      const { id } = req.params;

      let film = await Film.findOne({ _id: id }).populate("genres");
      let genres = await Genre.find();

      let oldDate = { ...film };
      oldDate._doc.oldDate = moment(film.showTime).format("DD MMMM YYYY, H:mm");
      res.render("admin/Film/editFilm", {
        title: `Admin | Update Film`,
        film: oldDate._doc,
        genres,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/film");
    }
  },
  actionEditFilm: async (req, res) => {
    try {
      const { id } = req.params;
      let { showTime, oldDate, ...payload } = req.body;

      if (!showTime) {
        showTime = moment(oldDate).format();
      }

      if (req.file) {
        // get file from uploaded
        let tmp_path = req.file.path;
        // take file extension
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        // concatenate filename with originalExt
        let filename = req.file.filename + "." + originalExt;
        // save to destination
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/film/${filename}`
        );

        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        // save file
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            // get old image
            let film = await Film.findOne({ _id: id });
            let curretImage = `${config.rootPath}/public/uploads/film/${film.thumbnail}`;
            if (fs.existsSync(curretImage)) {
              fs.unlinkSync(curretImage);
            }

            payload.thumbnail = filename;
            await Film.findOneAndUpdate(
              { _id: id },
              {
                ...payload,
                showTime,
                thumbnail: filename,
              }
            );

            req.flash("alertMessage", `Successfuly update film`);
            req.flash("alertStatus", `success`);
            res.redirect("/film");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/film");
          }
        });
      } else {
        await Film.findOneAndUpdate(
          { _id: id },
          {
            ...payload,
            showTime,
          }
        );

        req.flash("alertMessage", `Successfuly update film`);
        req.flash("alertStatus", `success`);
        res.redirect("/film");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/film");
    }
  },
  actionDeleteFilm: async (req, res) => {
    try {
      const { id } = req.params;
      await Film.findOneAndRemove({ _id: id });

      req.flash("alertMessage", `Successfuly delete film`);
      req.flash("alertStatus", `success`);
      res.redirect("/film");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/film");
    }
  },
};
