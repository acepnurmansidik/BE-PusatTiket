const express = require("express");
const {
  viewFilm,
  actionAddFilm,
  viewAddFilm,
  viewDetailFilm,
} = require("./controller");
const router = express.Router();

// read
router.get("/film", viewFilm);
// detail
router.get("/film/detail/:id", viewDetailFilm);
// update
router.get("/film/create", viewAddFilm);
router.post("/film/create", actionAddFilm);

module.exports = router;
