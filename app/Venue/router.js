const express = require("express");
const router = express.Router();
const { viewVenue, viewAddVenue, actionAddVenue, viewEditVenue, actionEditVenue, actionDeleteVenue } = require("./controller");

// read
router.get("/venue", viewVenue);
// create
router.get("/venue/create", viewAddVenue);
router.post("/venue/create", actionAddVenue);
// update
router.get("/venue/update/:id", viewEditVenue);
router.put("/venue/update/:id", actionEditVenue);
// delete
router.delete("/venue/delete/:id", actionDeleteVenue);

module.exports = router;
