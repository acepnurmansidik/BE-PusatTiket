const express = require("express");
const router = express.Router();

const { viewGenre, viewAddGenre, actionAddGenre, viewUpdateGenre, actionUpdateGenre, actionDeleteGenre } = require("./controller");
// read
router.get("/genre", viewGenre);
// create
router.get("/genre/create", viewAddGenre);
router.post("/genre/create", actionAddGenre);
// update
router.get("/genre/update/:id", viewUpdateGenre);
router.put("/genre/update/:id", actionUpdateGenre);
// delete
router.delete("/genre/delete/:id", actionDeleteGenre);

module.exports = router;
