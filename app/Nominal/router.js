const express = require("express");
const { viewNominal, viewAddNominal, actionAddNominal } = require("./controller");
const router = express.Router();

// read
router.get("/nominal", viewNominal);
// create
router.get("/nominal/create", viewAddNominal)
router.post("/nominal/create", actionAddNominal);

module.exports = router;
