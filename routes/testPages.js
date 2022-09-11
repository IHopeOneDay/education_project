const express = require("express");
const mongoUtils = require("../mongoUtils");
const { requireAuth } = require("./middlewares");
const testPageTemplate = require("../views/testPage");

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

router.get("/math/:test_id/questions", async (req, res) => {
  const questions = await usersDb.collection("math").findOne(
    { test_id: parseInt(req.params.test_id) },
    {
      projection: {
        "questions.choices": 1,
        "questions.question": 1,
        _id: 0,
      },
    }
  );

  res.json(JSON.stringify(questions));
});

module.exports = router;
