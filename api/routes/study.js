const express = require("express");
const router = express.Router();

// API calls
router.get("/getData", (req, res) => {
  console.log(req);
  res.json({ data: "karduni" });
});

module.exports = router;
