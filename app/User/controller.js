const path = require("path");
const fs = require("fs");
const moment = require("moment");
const { rootPath } = require("../../config");
const config = require("../../config");
const User = require("./model");
const Venue = require("../Venue/model");

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
  viewDetailUser: async (req, res) => {
    try {
      const { id } = req.params;

      let user = await User.findOne({ _id: id }).populate("venue");
      user._doc.ttl = moment(user.ttl).format("LL");

      res.render("admin/User/detailUser", {
        title: `Admin | Detail`,
        user,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
  viewEditUser: async (req, res) => {
    try {
      const { id } = req.params;

      let user = await User.findOne({ _id: id }).populate("venue");
      let venues = await Venue.find();
      user._doc.ttl = moment(user.ttl).format("LL");
      res.render("admin/User/updateUser", {
        title: `Admin | Update User`,
        user,
        venues,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
  actionEditUser: async (req, res) => {
    try {
      const { id } = req.params;
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

        let user = await User.findOne({ _id: id });
        const currentImage = `${config.rootPath}/public/uploads/user/${user.thumbnail}`;
        if (fs.existsSync(currentImage)) {
          fs.unlinkSync(currentImage);
        }
        await User.findOneAndUpdate(
          { _id: id },
          { thumbnail: filename, ...payload }
        );
        // file to be uploaded
        const src = fs.createReadStream(tmp_path);
        // save file
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);

        req.flash("alertMessage", `Successfuly update user!`);
        req.flash("alertStatus", `success`);
        res.redirect("/user");
      } else {
        await User.findOneAndUpdate({ _id: id }, { ...payload });

        req.flash("alertMessage", `Successfuly update user!`);
        req.flash("alertStatus", `success`);
        res.redirect("/user");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
  actionDeleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: id });
      const currentImage = `${config.rootPath}/public/uploads/user/${user.thumbnail}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
      await User.findByIdAndRemove({ _id: id });

      req.flash("alertMessage", `Successfuly delete user!`);
      req.flash("alertStatus", `success`);
      res.redirect("/user");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
  actionChangeStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await User.findOneAndUpdate({ _id: id }, { status });
      req.flash("alertMessage", `Successfuly change status user!`);
      req.flash("alertStatus", `success`);
      res.redirect("/user");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/user");
    }
  },
};
