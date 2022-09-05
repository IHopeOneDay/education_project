const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const mongoUtils = require("./mongoUtils");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
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
  app.use(authRouter);
  app.listen(3000, () => {
    console.log("Listening");
  });
});
