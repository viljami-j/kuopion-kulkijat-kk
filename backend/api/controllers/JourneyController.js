const Journey = require("../models/journey.model.js");

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
