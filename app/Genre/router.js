const express = require("express");
const router = express.Router();

const { viewGenre, viewAddGenre, actionAddGenre } = require("./controller");
// read
router.get("/genre", viewGenre);
// create
router.get("/add-genre", viewAddGenre);
router.post("/add-genre", actionAddGenre);

module.exports = router;
