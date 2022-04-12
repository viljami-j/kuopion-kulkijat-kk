const sql = require("./db.js");

const Story = function (story) {};

Story.create = (newStory, result) => {
  sql.query("INSERT INTO tarina SET ?", newStory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newStory });
  });
};

module.exports = Story;
