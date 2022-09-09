const express = require("express");
const questionLibTemplate = require("../views/questionLib");

const router = express();

router.get("/dersler", (req, res) => {
  res.send(questionLibTemplate());
});

module.exports = router;
