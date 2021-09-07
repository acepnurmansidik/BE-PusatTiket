const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");
const {
  viewUser,
  viewAddUser,
  actionAddUser,
  viewDetailUser,
  viewEditUser,
  actionEditUser,
  actionDeleteUser,
  actionChangeStatus,
} = require("./controller");

// read
router.get("/user", viewUser);
// detail
router.get("/user/detail/:id", viewDetailUser);
// create
router.get("/user/create", viewAddUser);
router.post(
  "/user/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionAddUser
);
// update
router.get("/user/update/:id", viewEditUser);
router.put(
  "/user/update/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  actionEditUser
);
// delete
router.delete("/user/delete/:id", actionDeleteUser);
// status
router.put("/user/status/:id", actionChangeStatus);

module.exports = router;
