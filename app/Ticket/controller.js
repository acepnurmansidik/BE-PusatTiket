const Film = require("../Film/model");
const Nominal = require("../Nominal/model");
const Ticket = require("./model");

module.exports = {
  viewTiket: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const tickets = await Ticket.find()
        .populate("nominal", "typeName price")
        .populate("film", "title");

      res.render("admin/Ticket/viewTicket", {
        title: "Admin | Ticket",
        alert,
        tickets,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/ticket");
    }
  },
  viewAddTicket: async (req, res) => {
    try {
      const films = await Film.find();
      const nominals = await Nominal.find();

      res.render("admin/Ticket/addTicket", {
        title: `Admin | Create Ticket`,
        films,
        nominals,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/ticket");
    }
  },
  actionAddTicket: async (req, res) => {
    try {
      const { film, nominals, seatNumber } = req.body;

      nominals.map(async (nominal) => {
        let ticket = await Ticket({ film, nominal, seatNumber });
        await ticket.save();
      });

      req.flash("alertMessage", `Successfuly create ticket`);
      req.flash("alertStatus", `success`);
      res.redirect("/ticket");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/ticket");
    }
  },
  viewDetailTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findOne({ _id: id })
        .populate("film")
        .populate("nominal");

      res.render("admin/Ticket/detailTicket", {
        title: `Admin | Detail Ticket`,
        ticket,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/ticket");
    }
  },
};
