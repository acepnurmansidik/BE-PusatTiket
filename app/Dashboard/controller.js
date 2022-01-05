const User = require("../User/model");
const Film = require("../Film/model");

module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const users = await User.countDocuments();
      const films = await Film.countDocuments();
      console.log(users);

      res.render("admin/Dashboard/viewDashboard", {
        title: `Admin | Dashboard`,
        users,
        films,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/dashboard");
    }
  },
};
