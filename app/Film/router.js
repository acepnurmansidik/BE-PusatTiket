const express = require("express");
const {
  viewFilm,
  actionAddFilm,
  viewAddFilm,
  viewDetailFilm,
  viewEditFilm,
  actionEditFilm,
  actionDeleteFilm,
} = require("./controller");
const router = express.Router();

// read
router.get("/film", viewFilm);
// detail
router.get("/film/detail/:id", viewDetailFilm);
// create
router.get("/film/create", viewAddFilm);
router.post("/film/create", actionAddFilm);
// update
router.get("/film/update/:id", viewEditFilm);
router.put("/film/update/:id", actionEditFilm);
// delete
router.delete("/film/delete/:id", actionDeleteFilm);

module.exports = router;
