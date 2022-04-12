const Story = require("../models/story.model.js");

exports.findById = (req, res) => {
  Story.findById(req.params.storyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Didn't find any stories with given id: ${req.params.storyId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving a story with id " + req.params.storyId,
        });
      }
    } else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const story = {
    idmatka: req.body.journeyId,
    idmatkakohde: req.body.destinationId,
    pvm: req.body.date,
    teksti: req.body.text,
  };

  let err = { msg: "", flagged: false };

  if (isNaN(req.body.journeyId)) {
    err.msg += "journeyId must be a number! ";
    err.flagged = true;
  }
  if (isNaN(req.body.destinationId)) {
    err.msg += "destinationId must be a number! ";
    err.flagged = true;
  }
  if (!req.body.date) {
    err.msg += "date cannot be empty! ";
    err.flagged = true;
  }
  if (!req.body.text) {
    err.msg += "text cannot be empty! ";
    err.flagged = true;
  }

  if (!err.flagged) {
    Story.create(story, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating a story.",
        });
      else res.send(data);
    });
  } else {
    console.log("error: story not created -", err.msg);
    res.status(400).send({
      message: err.msg,
    });
  }
};
