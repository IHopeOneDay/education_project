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
        questionsDb = client.db("questions");
        return cb(err);
      }
    );
  },
  getUsersDb: () => {
    return usersDb;
  },
  getQuestionsDb: () => {
    return questionsDb;
  },
  returnDefaultTestValues: async () => {
    const userTestStats = [];
    const mathTests = await usersDb
      .collection("math")
      .find()
      .project({ test_id: 1, _id: 0 });
    mathTests.forEach((test) => {
      console.log(test);
      const testStats = {};
      Object.assign(testStats, test, {
        t: 0,
        f: 0,
        b: 0,
        isTouched: false,
      });
      userTestStats.push(testStats);
    });
    return userTestStats;
  },
};
