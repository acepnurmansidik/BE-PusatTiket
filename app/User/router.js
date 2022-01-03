const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");
const { viewUser, viewAddUser, actionAddUser } = require("./controller");

// read
router.get("/user", viewUser);
// create
router.get("/user/create", viewAddUser);
router.post(
  "/user/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionAddUser
);

module.exports = router;
