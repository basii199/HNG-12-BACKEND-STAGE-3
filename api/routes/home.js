const express = require("express");
const router = express.Router();
const integrationConfig = require("../config/integrationConfig.json");

router.get("/", (req, res) => {
  res.send("Home page");
});

router.get("/config", (req, res) => {
  res.json(integrationConfig);
});

router.get("/time", (req, res) => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  res.json({ time });
});

module.exports = router;
