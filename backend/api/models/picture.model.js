const sql = require("./db.js");

const Picture = function (picture) {};

Picture.remove = (idkuva, result) => {
  sql.query("DELETE FROM kuva WHERE idkuva = ?", idkuva, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // picture with provided id not found
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Picture.create = (newPicture, result) => {
  sql.query("INSERT INTO kuva SET ? ", newPicture, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newPicture });
  });
};

Picture.findById = (idkuva, result) => {
  const blobToBase64 = function (blob, callback) {
    let b64;

    if (blob) {
      let data = blob;
      let buff = Buffer.from(data);
      b64 = buff.toString("base64");
    } else console.log("blobToBase64: received falsy argument");

    callback(b64);
  };

  sql.query(
    `SELECT kuva AS picture FROM kuva WHERE idkuva = ${idkuva}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        blobToBase64(res[0].picture, (picture_b64) => {
          result(null, {
            image: picture_b64,
          });
        });
      } else result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Picture;
