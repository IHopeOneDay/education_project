const express = require("express");
const { ObjectId } = require("bson");
const mongoUtils = require("../mongoUtils");
const { requireAuth, requireStudent } = require("./middlewares");
const questionMarketTemplate = require("../views/questionSolutionMarket");

const router = express.Router();

const usersDb = mongoUtils.getUsersDb();

router.get("/sorucozum", requireAuth, requireStudent, async (req, res) => {
  Promise.all([
    usersDb
      .collection("students")
      .findOne(
        { _id: new ObjectId(req.session.userId) },
        { projection: { credits: 1, _id: 0 } }
      ),
    usersDb
      .collection("teachers")
      .find({ isProfileSet: true })
      .project({ name: 1, stars: 1, creditsPerQuestion: 1, imgPath: 1, _id: 1 })
      .toArray(),
  ]).then((values) => {
    res.send(
      questionMarketTemplate({
        credits: values[0].credits,
        teachers: values[1],
      })
    );
  });
});

router.get("/sorucozum/:teacherId", (req, res) => {
  res.send(req.params.teacherId);
});

module.exports = router;
