const express = require("express");
const router = express.Router();
const { viewVenue, viewAddVenue, actionAddVenue } = require("./controller");

// read
router.get("/venue", viewVenue);
// create
router.get("/venue/create", viewAddVenue);
router.post("/venue/create", actionAddVenue);

module.exports = router;
