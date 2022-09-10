const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const mongoUtils = require("./mongoUtils");
const { cookieKey } = require("./keys");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
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
  app.use(authRouter);
  app.use(questionLibRouter);
  app.use(lecturesRouter);
  app.listen(3000, () => {
    console.log("Listening");
  });
});
