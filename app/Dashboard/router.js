const express = require("express");
const { viewDashboard } = require("./controller");
const router = express.Router();

router.get("/dashboard", viewDashboard);

module.exports = router;
