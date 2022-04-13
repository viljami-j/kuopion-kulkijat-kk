const sql = require("./db.js");

const Story = function (story) {
  (this.date = story.date),
    (this.text = story.text),
    (this.destinationId = story.destinationId),
    (this.journeyId = story.journeyId);
};

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

Story.updateById = (storyId, story, result) => {
  sql.query(
    "UPDATE tarina SET pvm = ?, teksti = ?, idmatkakohde = ?, idmatka = ? WHERE idtarina = ?",
    [story.date, story.text, story.destinationId, story.journeyId, storyId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { storyId: storyId, ...story });
    }
  );
};

Story.remove = (storyId, result) => {
  sql.query("DELETE FROM kuva WHERE idtarina = ?", storyId, (err_pics, res) => {
    if (err_pics) {
      console.log("error: ", err_pics);
      result(null, err_pics);
      return;
    }
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
  });
};

module.exports = Story;
