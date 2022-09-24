const express = require("express");
const path = require("path");
const multer = require("multer");
const { ObjectId } = require("bson");
const mongoUtils = require("../mongoUtils");
const { requireAuth, requireStudent } = require("./middlewares");
const questionMarketTemplate = require("../views/questionSolutionMarket");
const questionAskingTemplate = require("../views/questionAsking");

const router = express.Router();

const usersDb = mongoUtils.getUsersDb();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(__dirname, ".."), "question_photographs"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

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

router.get(
  "/sorucozum/askedQuestions",
  requireAuth,
  requireStudent,
  async (req, res) => {
    const cursor = await usersDb
      .collection("questionMarket")
      .find({
        student_id: req.session.userId,
        isActive: true,
      })
      .project({ isActive: 0, _id: 0, questionPrice: 0, student_id: 0 });
    const askedQuestions = await cursor.toArray();
    res.json(JSON.stringify(askedQuestions));
  }
);

router.get("/sorucozum/getTeacherInformation/:teacherId", async (req, res) => {
  const teacher = await usersDb
    .collection("teachers")
    .findOne(
      { _id: req.params.teacherId },
      { projection: { imgPath: 1, name: 1, _id: 0 } }
    );
  res.json(JSON.stringify(teacher));
});

router.get(
  "/sorucozum/:teacherId",
  requireAuth,
  requireStudent,
  async (req, res) => {
    const teacher = await usersDb.collection("teachers").findOne(
      { _id: new ObjectId(req.params.teacherId) },
      {
        projection: {
          name: 1,
          creditsPerQuestion: 1,
          imgPath: 1,
        },
      }
    );
    const student = await usersDb.collection("students").findOne({
      _id: new ObjectId(req.session.userId),
    });

    /*    if (student.askedQuestions) {
      const doesntContainTeacher = student.askedQuestions.every((part) => {
        if (part.teacherId !== req.params.teacherId) {
          return true;
        }
      });
      if (doesntContainTeacher) {
        student.askedQuestions.push({
          teacherId: req.params.teacherId,
          questions: [{ imgPath: null, explanation: null }],
          questionPrice: teacher.creditsPerQuestion,
          isActive: false,
          isFulfilled: false,
          created: Date.now(),
        });
      }
      usersDb
        .collection("students")
        .updateOne(
          { _id: new ObjectId(req.session.userId) },
          { $set: { askedQuestions: student.askedQuestions } }
        );
    } else {
      usersDb.collection("students").updateOne(
        { _id: new ObjectId(req.session.userId) },
        {
          $set: {
            askedQuestions: [
              {
                teacherId: req.params.teacherId,
                questions: [{ imgPath: null, explanation: null }],
                questionPrice: teacher.creditsPerQuestion,
                isActive: false,
                isFulfilled: false,
                created: Date.now(),
              },
            ],
          },
        }
      );
    }*/

    await usersDb.collection("questionMarket").findOneAndUpdate(
      {
        student_id: req.session.userId,
        teacherId: req.params.teacherId,
        isActive: false,
      },
      {
        $setOnInsert: {
          isFulfilled: false,
          created: Date.now(),
          questions: [],
          questionPrice: teacher.creditsPerQuestion,
        },
      },
      { upsert: true }
    );

    res.send(
      questionAskingTemplate({
        credits: student.credits,
        teacher: teacher,
      })
    );
  }
);

router.post(
  "/sorucozum/:teacherId/addNewQuestion",
  requireAuth,
  requireStudent,
  async (req, res) => {
    if (req.body.action === "add") {
      const questionMarketEntity = await usersDb
        .collection("questionMarket")
        .findOneAndUpdate(
          {
            student_id: req.session.userId.toString(),
            teacherId: req.params.teacherId,
            isActive: false,
          },
          {
            $push: {
              questions: { imgPath: null, explanation: null },
            },
          },
          {
            returnDocument: "after",
            projection: { questions: 1, _id: 0 },
          }
        );
      res.send(JSON.stringify({ questionMarketEntity }));
      return;
    }
  }
);

router.post("/sorucozum/:teacherId/removeQuestion", async (req, res) => {
  const { questionNumber } = req.body;
  const questionKey = "questions." + (questionNumber - 1);
  const $unsetQuery = {};
  $unsetQuery[questionKey] = 1;
  await usersDb.collection("questionMarket").updateOne(
    {
      student_id: req.session.userId,
      teacherId: req.params.teacherId,
      isActive: false,
    },
    { $unset: $unsetQuery }
  );
  await usersDb.collection("questionMarket").updateOne(
    {
      student_id: req.session.userId,
      teacherId: req.params.teacherId,
      isActive: false,
    },
    { $pull: { questions: null } }
  );
  res.json({});
});

router.post(
  "/sorucozum/:teacherId/finishOrder",
  upload.array("question-image"),
  async (req, res) => {
    const questionMarketEntity = await usersDb
      .collection("questionMarket")
      .findOne({
        student_id: req.session.userId,
        teacherId: req.params.teacherId,
        isActive: false,
      });
    let totalPrice;
    if (questionMarketEntity) {
      totalPrice =
        questionMarketEntity.questions.length *
        questionMarketEntity.questionPrice;
    }
    const hasEnoughMoney = async () => {
      const results = await usersDb.collection("students").findOneAndUpdate(
        {
          _id: new ObjectId(req.session.userId),
          credits: { $gte: totalPrice },
        },
        { $inc: { credits: -totalPrice } }
      );
      return results;
    };

    const result = await hasEnoughMoney();

    const questionsArray = [];
    req.files.forEach((image, idx) => {
      const imgPath = image.path.split("/");
      questionsArray[idx] = {};
      questionsArray[idx].imgPath = imgPath[imgPath.length - 1];
      questionsArray[idx].explanation = req.body["question-explanation"][idx];
    });
    console.log(questionsArray);
    if (result.value !== null) {
      await usersDb.collection("questionMarket").updateOne(
        {
          student_id: req.session.userId,
          teacherId: req.params.teacherId,
          isActive: false,
        },
        { $set: { isActive: true, questions: questionsArray } }
      );
    }
    res.redirect("/sorucozum");
  }
);

module.exports = router;
