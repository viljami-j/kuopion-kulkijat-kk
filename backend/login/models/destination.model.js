const sql = require("./db.js");

// constructor matkakohde
const Destination = function (destination) {
  this.idmatkakohde = destination.idmatkakohde;
  this.kohdenimi = destination.kohdenimi;
  this.maa = destination.maa;
  this.paikkakunta = destination.paikkakunta;
  this.kuvausteksti = destination.kuvausteksti;
  this.kuva = destination.kuva;
};

Destination.create = (newDestination, result) => {
  sql.query("INSERT INTO matkakohde SET ?", newDestination, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created destination: ", { id: res.insertId, ...newDestination });
    result(null, { id: res.insertId, ...newDestination });
  });
};

Destination.findById = (idmatkakohde, result) => {
  sql.query(`SELECT * FROM matkakohde WHERE idmatkakohde = ${idmatkakohde}`, (err, res) => {
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

    // not found destination with the id
    result({ kind: "not_found" }, null);
  });
};

// Tällä sit muokkaamalla mahdollista hakea vaikka kaikki saman maan jutut?
Destination.getAll = (maa, result) => {
  let query = "SELECT * FROM matkakohde";

  if (maa) {
    query += ` WHERE title LIKE '%${maa}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Matkakohteet: ", res);
    result(null, res);
  });
};

// Tän avulla privaatit jutut maybe?
Destination.getAllPublished = result => {
  sql.query("SELECT * FROM matka WHERE yksityinen=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("yksityiset: ", res);
    result(null, res);
  });
};

Destination.updateById = (idmatkakohde, destination, result) => {
  sql.query(
    "UPDATE matkakohde SET kohdenimi = ?, maa = ?, paikkakunta = ?, kuvausteksti = ? WHERE idmatkakohde = ?",
    [destination.kohdenimi, destination.maa, destination.paikkakunta, destination.kuvausteksti, idmatkakohde],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found destination with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated destination: ", { idmatkakohde: idmatkakohde, ...destination });
      result(null, { idmatkakohde: idmatkakohde, ...destination });
    }
  );
};

Destination.remove = (idmatkakohde, result) => {
  sql.query("DELETE FROM matkakohde WHERE idmatkakohde = ?", idmatkakohde, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found destination with the idmatkakohde
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted matkakohde with idmatkakohde: ", id);
    result(null, res);
  });
};

/*Destination.removeAll = result => {
  sql.query("DELETE FROM matkakohde", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} matkakohteet`);
    result(null, res);
  });
};*/

module.exports = Destination;
