const path = require("path");
const express = require("express");
const multer = require("multer");
const { ObjectId } = require("bson");
const mongoUtils = require("../mongoUtils");
const { requireTeacher } = require("./middlewares");
const router = express.Router();

const teacherMainTemplate = require("../views/teacherMain");
const teacherSetProfileTemplate = require("../views/teacherSetProfile");

const usersDb = mongoUtils.getUsersDb().collection("teachers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(__dirname, ".."), "teacher_photographs"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const updload = multer({ storage: storage });

router.get("/ogretmen", requireTeacher, async (req, res) => {
  const teacher = await usersDb.findOne({
    _id: new ObjectId(req.session.userId),
  });
  if (!teacher.isProfileSet) {
    res.send(teacherMainTemplate({}));
    return;
  }
  res.send(`Toplam krediniz:${teacher.credits}`);
});

router.get("/ogretmen/profile", async (req, res) => {
  res.send(teacherSetProfileTemplate());
});

router.post(
  "/ogretmen/setProfile",
  requireTeacher,
  updload.single("avatar"),
  async (req, res) => {
    await usersDb.updateOne(
      { _id: new ObjectId(req.session.userId) },
      {
        $set: {
          name: req.body.name + " " + req.body.surname,
          creditsPerQuestion: parseInt(req.body.creditsPerQuestion),
          profession: req.body.profession,
          imgPath: req.file.filename,
          isProfileSet: true,
        },
      }
    );
    res.redirect("/ogretmen");
  }
);

module.exports = router;
