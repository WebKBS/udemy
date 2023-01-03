const express = require("express");
const router = express.Router();

router.get("/topsecret", (req, res) => {
  res.send("This is Top Secret");
});

router.get("/deleteeverything", (req, res) => {
  res.send("Delete All!!!");
});

module.exports = router;
