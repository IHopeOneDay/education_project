const express = require("express");
const questionLibTemplate = require("../views/questionLib");
const { requireAuth } = require("./middlewares");

const router = express();

router.get("/dersler", requireAuth, (req, res) => {
  res.send(questionLibTemplate());
});

module.exports = router;
