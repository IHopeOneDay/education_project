const { check } = require("express-validator");
const argon2 = require("argon2");
const mongoUtils = require("../mongoUtils");

const usersDb = mongoUtils.getUsersDb();
let user;
module.exports = {
  requireEmail: check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Lütfen geçerli bir mail adresi giriniz.")
    .custom(async (email, { req }) => {
      user = await usersDb.collection("students").findOne({ email });
      if (req.body.isNew === "newUser") {
        if (user) {
          throw new Error("Bu email ile kayıt olmuş başka bir hesap var.");
        }
        return true;
      } else if (req.body.isNew === "login") {
        if (!user) {
          throw new Error("Hatalı mail adresi veya parola");
        }
        return true;
      }
    }),
  requirePassword: check("password")
    .trim()
    .custom((password, { req }) => {
      if (req.body.isNew === "newUser") {
        if (password.length < 6 || password.length > 24) {
          throw new Error(
            "Parola uzunluğu 6 ile 24 karakter arasında olmalıdır."
          );
        }
      }
      return true;
    }),
  requirePasswordConfirmation: check("passConf")
    .trim()
    .custom((passconf, { req }) => {
      if (req.body.isNew === "newUser") {
        if (passconf.length < 6 && passconf.length > 24) {
          throw new Error("Parola tekrarı 6 ile 24 karakter arasında olmalı.");
        }
        if (passconf !== req.body.password) {
          throw new Error("Parola ile parola tekrarı eşleşmelidir.");
        }
      }
      return true;
    }),
  requireValidPasswordForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      if (req.body.isNew === "login") {
        if (user) {
          const validPassword = await argon2.verify(user.password, password);
          if (!validPassword) {
            throw new Error("Hatalı mail adresi veya parola");
          }
          req.session.userId = user._id.toString();
        }
      }
      return true;
    }),
};
