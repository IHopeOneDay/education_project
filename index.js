const { MongoClient } = require("mongodb");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const mongoUtils = require("./mongoUtils");
const { cookieKey } = require("./keys");
const { requireAuth } = require("./routes/middlewares");
const app = express();

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "teacher_photographs")));
app.use(express.static(path.join(__dirname, "question_photographs")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieSession({ keys: [cookieKey] }));
/*const client = new MongoClient(
  "mongodb://root:root@localhost:27011/?authMechanism=DEFAULT&authSource=admin"
);

client
  .connect()
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening");
    });
  });
*/

mongoUtils.connectToServer(function (err, client) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const authRouter = require("./routes/auth");
  const questionLibRouter = require("./routes/questionLibrary");
  const lecturesRouter = require("./routes/lectures");
  const testPageRouter = require("./routes/testPages");
  const questionMarketRouter = require("./routes/questionSolutionMarket");
  const teacherMainRotuer = require("./routes/teacherMain");
  app.use(authRouter);
  app.use(questionLibRouter);
  app.use(lecturesRouter);
  app.use(testPageRouter);
  app.use(questionMarketRouter);
  app.use(teacherMainRotuer);
  app.listen(3000, () => {
    console.log("Listening");
  });
});
