const sql = require("./db.js");


const Users = function (users) {
  this.idmatkaaja = users.idmatkaaja;
  this.etunimi = users.etunimi;
  this.sukunimi = users.sukunimi;
  this.nimimerkki = users.nimimerkki;
  this.paikkakunta = users.paikkakunta;
  this.esittely = users.esittely;
  this.kuva = users.kuva;
  this.email = users.email;
  this.password = users.password;
};

Users.findById = (idmatkaaja, result) => {
  sql.query(`SELECT * FROM matkaaja WHERE idmatkaaja = ${idmatkaaja}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found destination: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Users.getAll = (idmatkaaja, result) => {
  let query = "SELECT * FROM matkaaja";

  if (idmatkaaja) {
    query += ` WHERE title LIKE '%${idmatkaaja}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("matkaaja: ", res);
    result(null, res);
  });
};

Users.updateById = (idmatkaaja, users, result) => {
    sql.query(
      "UPDATE matkaaja SET etunimi = ?, sukunimi = ?, nimimerkki = ?, paikkakunta = ?, esittely =? WHERE idmatkaaja = ?",
      [users.etunimi, users.sukunimi, users.nimimerkki, users.paikkakunta, users.esittely, idmatkaaja],
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
  
        console.log("updated destination: ", { idmatkaaja: idmatkaaja, ...users });
        result(null, { idmatkaaja: idmatkaaja, ...users });
      }
    );
  };
  

module.exports = Users;
