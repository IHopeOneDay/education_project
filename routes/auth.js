const express = require("express");
const argon2 = require("argon2");
const signinTemplate = require("../views/signin");
const mongoUtils = require("../mongoUtils");

const router = express.Router();
const usersDb = mongoUtils.getUsersDb();

router.get("/", (req, res) => {
  res.send(signinTemplate());
});

router.post("/", async (req, res) => {
  const { isNew, email, password, passConf } = req.body;
  if (isNew === "newUser") {
    if (isNew === "newUser" && password !== passConf) {
      res.send("Password and password confirmation must match");
      return;
    }
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    usersDb
      .collection("students")
      .insertOne({ email, password: hashedPassword });
    res.send("You signed in succesfully");
    return;
  } else if (isNew === "login") {
    const user = await usersDb.collection("students").findOne({ email });
    if (!user) {
      res.send("Wrong email or password");
      return;
    }
    if (user) {
      if (await argon2.verify(user.password, password)) {
        res.send("You logged in succesfully");
        return;
      }
      res.send("Wrong password or email");
    }
  }
});

module.exports = router;
