const express = require("express");
const router = express.Router();
const csv = require("csvtojson");

// API calls
router.get("/getData", (req, res) => {
  //   console.log(req);
  csv()
    .fromFile("./public/testAccount.csv")
    .then((jsonObj) => {
      //   console.log(jsonObj);
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */

      res.json(jsonObj);
    });
  //   res.json({ data: "karduni" });
});

module.exports = router;
