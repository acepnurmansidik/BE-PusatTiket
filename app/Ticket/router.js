const express = require("express");
const {
  viewTiket,
  viewAddTicket,
  actionAddTicket,
  viewDetailTicket,
} = require("./controller");
const router = express.Router();

// read
router.get("/ticket", viewTiket);
// detail
router.get("/ticket/detail/:id", viewDetailTicket);
// create
router.get("/ticket/create", viewAddTicket);
router.post("/ticket/create", actionAddTicket);

module.exports = router;
