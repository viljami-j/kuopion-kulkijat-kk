// Contains GET-endpoint for fetching all public user data
//
// Possibly belongs to users.js?
// Now at least temporarily worked on this file to avoid merge conflicts

const sql = require("./db.js");

const UsersPublic = function (destination) {};

UsersPublic.getAll = (result) => {
  sql.query(
    "SELECT idmatkaaja AS userId, etunimi AS firstname, sukunimi AS lastname, nimimerkki AS username, paikkakunta AS city, esittely AS introduction, kuva AS profilePicture FROM matkaaja",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      result(null, res);
    }
  );
};

module.exports = UsersPublic;
