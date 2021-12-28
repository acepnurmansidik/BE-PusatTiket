const express = require("express");
const { viewNominal, viewAddNominal, actionAddNominal, viewEditNominal, actionEditNominal, actionDeleteNominal } = require("./controller");
const router = express.Router();

// read
router.get("/nominal", viewNominal);
// create
router.get("/nominal/create", viewAddNominal)
router.post("/nominal/create", actionAddNominal);
// update
router.get("/nominal/update/:id", viewEditNominal)
router.put("/nominal/update/:id", actionEditNominal)
// delete
router.delete("/nominal/delete/:id", actionDeleteNominal)

module.exports = router;
