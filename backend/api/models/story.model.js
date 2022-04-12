const sql = require("./db.js");

const Story = function (story) {};

Story.findById = (storyId, result) => {
  sql.query(
    `SELECT idmatkakohde AS destinationId, idmatka AS journeyId,  DATE_FORMAT(pvm, '%Y-%m-%d') AS date, teksti AS text FROM tarina WHERE idtarina = ${storyId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
      } else result({ kind: "not_found" }, null);
    }
  );
};

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

Story.remove = (storyId, result) => {
    sql.query("DELETE FROM tarina WHERE idtarina = ?", storyId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      result(null, res);
    });
  };

module.exports = Story;
