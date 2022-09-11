const express = require("express");
const { ObjectID } = require("bson");

const mongoUtils = require("../mongoUtils");
const { requireAuth } = require("./middlewares");
const lecturesTemplate = require("../views/lecture");

const router = express.Router();

const usersDb = mongoUtils.getUsersDb();

router.get("/math", requireAuth, async (req, res) => {
  const userCursor = await usersDb.collection("students").aggregate([
    { $match: { _id: new ObjectID(req.session.userId) } },
    { $limit: 1 },
    { $project: { math: 1, _id: 0 } },
    { $unwind: "$math" },
    {
      $lookup: {
        from: "math",
        localField: "math.test_id",
        foreignField: "test_id",
        as: "test_information",
      },
    },
    {
      $project: {
        math: 1,
        "test_information.difficulty": 1,
        "test_information.name": 1,
      },
    },
    { $unwind: "$test_information" },
  ]);

  const tests = await userCursor.toArray();

  res.send(lecturesTemplate(tests));
});

module.exports = router;
