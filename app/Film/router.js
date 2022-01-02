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
const multer = require("multer");
const os = require("os");

// read
router.get("/film", viewFilm);
// detail
router.get("/film/detail/:id", viewDetailFilm);
// create
router.get("/film/create", viewAddFilm);
router.post(
  "/film/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionAddFilm
);
// update
router.get("/film/update/:id", viewEditFilm);
router.put(
  "/film/update/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  actionEditFilm
);
// delete
router.delete("/film/delete/:id", actionDeleteFilm);

module.exports = router;
