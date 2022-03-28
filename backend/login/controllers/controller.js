const Destination = require("../models/destination.model.js");

// Create and Save a new Destination
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Destination
  const destination = new Destination({
    idmatkakohde: req.body.idmatkakohde,
    kohdenimi: req.body.kohdenimi,
    maa: req.body.maa,
    paikkakunta: req.body.paikkakunta,
    kuvausteksti: req.body.kuvausteksti,
    kuva: req.body.kuva || null
  });

  // Create/Post Destination in the database
  Destination.create(destination, (err, data) => {
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
  Destination.getAll(title, (err, data) => {
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
  Destination.findById(req.params.idmatkakohde, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Destination with id ${req.params.idmatkakohde}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Destination with id " + req.params.idmatkakohde
        });
      }
    } else res.send(data);
  });
};

// Privaatti juttujen koodia
exports.findAllPublished = (req, res) => {
  Destination.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Destinations."
      });
    else res.send(data);
  });
};

// Update a Destination identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Destination.updateById(
    req.params.idmatkakohde,
    new Destination(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Destination with id ${req.params.idmatkakohde}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Destination with id " + req.params.idmatkakohde
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Destination with the specified id in the request
exports.delete = (req, res) => {
  Destination.remove(req.params.idmatkakohde, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Destination with id ${req.params.idmatkakohde}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Destination with id " + req.params.idmatkakohde
        });
      }
    } else res.send({ message: `Destination was deleted successfully!` });
  });
};

// Delete all Destinations from the database.
/*exports.deleteAll = (req, res) => {
  Destination.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Destinations."
      });
    else res.send({ message: `All Destinations were deleted successfully!` });
  });
};*/
