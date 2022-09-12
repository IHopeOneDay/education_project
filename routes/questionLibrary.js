const express = require("express");
const { ObjectId } = require("bson");
const questionLibTemplate = require("../views/questionLib");
const { requireAuth } = require("./middlewares");
const mongoUtils = require("../mongoUtils");
const usersDb = mongoUtils.getUsersDb();
const router = express();

router.get("/dersler", requireAuth, async (req, res) => {
  let tests = await usersDb
    .collection("students")
    .findOne(
      { _id: new ObjectId(req.session.userId) },
      { projection: { "math.isTouched": 1, _id: 0 } }
    );
  tests = tests.math;
  let totalTests = 0;
  let touchedTests = 0;
  tests.forEach((test) => {
    if (test.isTouched === true) {
      touchedTests += 1;
    }
    totalTests += 1;
  });

  const testsPercentage = (touchedTests / totalTests).toFixed(2) * 100 || 0;
  res.send(questionLibTemplate(testsPercentage));
});

module.exports = router;
