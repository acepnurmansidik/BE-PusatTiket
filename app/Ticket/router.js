const express = require("express");
const {
  viewTiket,
  viewAddTicket,
  actionAddTicket,
  viewDetailTicket,
  viewUpdateTicket,
  actionUpdateTicket,
  actionDeleteTicket,
} = require("./controller");
const router = express.Router();

// read
router.get("/ticket", viewTiket);
// detail
router.get("/ticket/detail/:id", viewDetailTicket);
// create
router.get("/ticket/create", viewAddTicket);
router.post("/ticket/create", actionAddTicket);
// update
router.get("/ticket/update/:id", viewUpdateTicket);
router.put("/ticket/update/:id", actionUpdateTicket);
// delete
router.delete("/ticket/delete/:id", actionDeleteTicket);

module.exports = router;
