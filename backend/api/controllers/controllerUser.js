const Users = require("../models/destinationUser.js");

// Create and Save a new Destination
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Destination
  const uuser = new Users({
    idmatkaaja: req.body.idmatkaaja,
    etunimi: req.body.etunimi,
    sukunimi: req.body.sukunimi,
    nimimerkki: req.body.nimimerkki,
    paikkakunta: req.body.paikkakunta,
    esittely: req.body.esittely,
    kuva: req.body.kuva || null,
    email: req.body.email,
    password: req.body.password
  });

  // Create/Post Destination in the database
  Users.create(uuser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Destination."
      });
    else res.send(data);
  });
};

// Retrieve all Destinations from the database with condition (e. maa, paikkakunta).
exports.findAll = (req, res) => {
  const title = req.query.title; // muokkaa tarpeen mukaan
  Users.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Destinations."
      });
    else res.send(data);
  });
};

// Find a single Destination by Id
exports.findOne = (req, res) => {
  Users.findById(req.params.idmatkaaja, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Destination with id ${req.params.idmatkaaja}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Destination with id " + req.params.idmatkaaja
        });
      }
    } else res.send(data);
  });
};
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Users.updateById(
      req.params.idmatkaaja,
      new Users(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Destination with id ${req.params.idmatkaaja}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Destination with id " + req.params.idmatkaaja
            });
          }
        } else res.send(data);
      }
    );
  };
  