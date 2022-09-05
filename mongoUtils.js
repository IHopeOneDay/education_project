const { MongoClient } = require("mongodb");

let usersDb;

module.exports = {
  connectToServer: (cb) => {
    MongoClient.connect(
      "mongodb://root:root@localhost:27011/?authMechanism=DEFAULT&authSource=admin",
      { useNewUrlParser: true },
      function (err, client) {
        usersDb = client.db("users");
        return cb(err);
      }
    );
  },
  getUsersDb: () => {
    return usersDb;
  },
};
