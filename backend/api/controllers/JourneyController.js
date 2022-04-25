const Journey = require("../models/journey.model.js");

exports.findJourneysByJourneyId = (req, res) => {
  Journey.findByJourneyId(req.params.idmatka, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Didn't find any journeys with id ${req.params.idmatka}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving a journey with id " + req.params.idmatka,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findJourneysByUserId = (req, res) => {
  Journey.findByUserId(req.params.idmatkaaja, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Didn't find any journeys assigned to given user id ${req.params.idmatkaaja}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving journeys for given user id " +
            req.params.idmatkaaja,
        });
      }
    } else {
      res.send(data);
    }
  });
};
