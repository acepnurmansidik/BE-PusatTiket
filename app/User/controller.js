const path = require("path");
const fs = require("fs");
const User = require("./model");
const Venue = require("../Venue/model");
const config = require("../../config");
const { rootPath } = require("../../config");

module.exports = {
  viewUser: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const users = await User.find().populate("venue");

      res.render("admin/User/viewUser", {
        title: `Admin | User`,
        alert,
        users,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
  viewAddUser: async (req, res) => {
    try {
      const venues = await Venue.find();

      res.render("admin/User/addUser", {
        title: `Admin | User`,
        venues,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
  actionAddUser: async (req, res) => {
    try {
      const payload = req.body;
      if (req.file) {
        //  get file from uploaded
        let tmp_path = req.file.path;
        // take file extension
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        // concatenate filename with originalExt
        let filename = `${req.file.filename}.${originalExt}`;
        // save to destination
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/user/${filename}`
        );
        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        // save file
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", async () => {
          try {
            const user = new User({
              thumbnail: filename,
              ...payload,
            });
            await user.save();

            req.flash("alertMessage", `Successfuly create user!`);
            req.flash("alertStatus", `success`);
            res.redirect("/user");
          } catch (err) {
            let currentImage = `${rootPath}/public/uploads/user/${filename}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/user");
          }
        });
      } else {
        console.log(phoneNumber);
        const user = new User({ ...payload });
        await user.save();

        req.flash("alertMessage", `Successfuly create user!`);
        req.flash("alertStatus", `success`);
        res.redirect("/user");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
};
