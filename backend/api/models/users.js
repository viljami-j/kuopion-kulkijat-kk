const pool = require("./db.js");
const bcrypt = require("bcrypt");
const express = require("express")
const app = express();

function User() {}

User.prototype = {
  // Find the user data by id or username.
  find: function (user = null, callback) {
    // if the user variable is defind
    if (user) {
      // if user = number return field = id, if user = string return field = username.
      var field = Number.isInteger(user) ? "idmatkaaja" : "email";
    }
    // prepare the sql query
    let sql = `SELECT * FROM matkaaja WHERE email = ?`;
    
    pool.query(sql, user, function (err, result) {
      if (err) throw err;

      if (result.length) {
        callback(result[0]);
      } else {
        callback(null);
      }
    });
  },
  create: function (body, callback) {
    var bind = [];
    for (prop in body) {
      bind.push(body[prop]);
    }
    if(bind[0] && bind[1] && bind[2] && bind[3] && bind[4]) {
    let sql = `INSERT INTO matkaaja(etunimi, sukunimi, nimimerkki, email, password) VALUES (?, ?, ?, ?, ?)`;
    pool.query(sql, bind, function (err, result) {
      if (err) throw err;
      callback(result.insertId);
    })}else{
    bind = [] 
   console.log("eipä menny")
  }
  },

  login: function (email, password, callback) {
    this.find(email, function (user) {
      if (user) {
        if (password === user.password) {
          callback(user);
          return;
        }
      }
      callback(null);
    });
  },
};

module.exports = User;
