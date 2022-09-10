const { MongoClient } = require("mongodb");

let usersDb;
let questionsDb;

module.exports = {
  connectToServer: (cb) => {
    MongoClient.connect(
      "mongodb://root:root@localhost:27011/?authMechanism=DEFAULT&authSource=admin",
      { useNewUrlParser: true },
      function (err, client) {
        usersDb = client.db("users");
        mathDb = client.db("questions");
        return cb(err);
      }
    );
  },
  getUsersDb: () => {
    return usersDb;
  },
  returnDefaultTestValues: () => {},
};
