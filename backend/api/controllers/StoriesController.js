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

  // const story = {
  //   idmatka: req.body.journeyId,
  //   idmatkakohde: req.body.destinationId,
  //   pvm: req.body.date,
  //   teksti: req.body.text,
  // };

  const story = req.body

  let err = { msg: "", flagged: false };

  if (isNaN(story.idmatka)) {
    err.msg += "journeyId must be a number! ";
    err.flagged = true;
  }
  if (isNaN(story.idmatkakohde)) {
    err.msg += "destinationId must be a number! ";
    err.flagged = true;
  }
  if (!story.pvm) {
    err.msg += "date cannot be empty! ";
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

exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Story.updateById(req.params.storyId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Didn't find any stories assigned to id ${req.params.storyId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating story with id " + req.params.storyId,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  Story.remove(req.params.storyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Didn't find a story with id ${req.params.storyId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete a story with id " + req.params.storyId,
        });
      }
    } else res.send({ message: `The story was deleted successfully!` });
  });
};
