const express = require("express");
const mongoUtils = require("../mongoUtils");
const { requireAuth } = require("./middlewares");
const testPageTemplate = require("../views/testPage");

const usersDb = mongoUtils.getUsersDb();

const router = express.Router();

router.get("/math/:test_id", requireAuth, async (req, res) => {
  const test = await usersDb
    .collection("math")
    .findOne(
      { test_id: parseInt(req.params.test_id) },
      { projection: { name: 1, questions: 1, _id: 0 } }
    );
  res.send(testPageTemplate());
});

module.exports = router;
