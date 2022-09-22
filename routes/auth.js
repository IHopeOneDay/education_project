const express = require("express");
const argon2 = require("argon2");
const { validationResult } = require("express-validator");
const signinTemplate = require("../views/signin");
const mongoUtils = require("../mongoUtils");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireValidPasswordForUser,
} = require("./validator");

const router = express.Router();
const usersDb = mongoUtils.getUsersDb();

router.get("/", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/",
  [
    requireEmail,
    requirePassword,
    requirePasswordConfirmation,
    requireValidPasswordForUser,
  ],
  async (req, res) => {
    const { isNew, email, password, accountType } = req.body;
    const errors = validationResult(req);
    if (isNew === "newUser") {
      if (!errors.isEmpty()) {
        return res.send(signinTemplate({ errors }, "newUser"));
      }
      const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
      });
      if (accountType === "student") {
        const mathStats = await mongoUtils.returnDefaultTestValues();
        await usersDb.collection("students").insertOne({
          email,
          password: hashedPassword,
          math: mathStats,
          credits: 0,
        });
      }
      if (accountType === "teacher") {
        await usersDb.collection("teachers").insertOne({
          email,
          password: hashedPassword,
          credits: 0,
          stars: null,
          isProfileSet: false,
        });
      }
      res.send("Başarılı bir şekilde kayıt oldunuz.");
      return;
    } else if (isNew === "login") {
      if (!errors.isEmpty()) {
        return res.send(signinTemplate({ errors }));
      }
      if (accountType === "student") {
        res.redirect("/dersler");
      } else if (accountType === "teacher") {
        res.redirect("/ogretmen");
      }
    }
    return;
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
