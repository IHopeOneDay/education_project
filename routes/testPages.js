const express = require("express");
const { ObjectId } = require("bson");
const mongoUtils = require("../mongoUtils");
const { requireAuth } = require("./middlewares");
const testPageTemplate = require("../views/testPage");
const { calculateObjectSize } = require("bson");
const usersDb = mongoUtils.getUsersDb();

const router = express.Router();

router.get("/math/:test_id", requireAuth, async (req, res) => {
  const test = await usersDb.collection("math").findOne(
    { test_id: parseInt(req.params.test_id) },
    {
      projection: {
        name: 1,
        "questions.choices": 1,
        "questions.question": 1,
        test_id: 1,
        _id: 0,
      },
    }
  );

  res.send(testPageTemplate(test));
});

router.get("/math/:test_id/questions", requireAuth, async (req, res) => {
  const questions = await usersDb.collection("math").findOne(
    { test_id: parseInt(req.params.test_id) },
    {
      projection: {
        test_id: 1,
        "questions.choices": 1,
        "questions.question": 1,
        _id: 0,
      },
    }
  );

  res.json(JSON.stringify(questions));
});

router.post("/math/:test_id", requireAuth, async (req, res) => {
  const answers = await usersDb
    .collection("math")
    .findOne(
      { test_id: parseInt(req.params.test_id) },
      { projection: { "questions.rightChoice": 1, _id: 0 } }
    );
  const totalQuestions = answers.questions.length;
  let trueNumber = 0;
  let falseNumber = 0;
  let blankNumber = 0;
  Object.keys(req.body).forEach((key) => {
    if (answers.questions[parseInt(key) - 1].rightChoice === req.body[key]) {
      trueNumber += 1;
    } else {
      falseNumber += 1;
    }
  });
  blankNumber = totalQuestions - trueNumber - falseNumber;
  const user = await usersDb.collection("students").updateOne(
    {
      _id: new ObjectId(req.session.userId),
    },
    {
      $set: {
        "math.$[elem].isTouched": true,
        "math.$[elem].t": trueNumber,
        "math.$[elem].f": falseNumber,
        "math.$[elem].b": blankNumber,
      },
    },
    { arrayFilters: [{ "elem.test_id": parseInt(req.params.test_id) }] }
  );
  res.redirect("/dersler");
});

module.exports = router;
