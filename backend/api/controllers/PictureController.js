const Picture = require("../models/picture.model.js");

exports.deletePictureById = (req, res) => {
  Picture.remove(req.params.idkuva, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Didn't find a picture with id ${req.params.idkuva}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete picture with id " + req.params.idkuva,
        });
      }
    } else res.send({ message: `The picture was deleted successfully!` });
  });
};

exports.create = (req, res) => {
  function b64toBlob(b64) {
    return Buffer.from(b64, "base64");
  }

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (isNaN(req.body.storyId)) {
    res.status(400).send({
      message: "storyId must be a number!",
    });
    return;
  }

  // Create a Picture
  const picture = {
    /*idkuva: ,*/
    idtarina: req.body.storyId,
    kuva: b64toBlob(req.body.image),
  };

  // Create/Post Picture in the database, if body keys weren't empty
  Picture.create(picture, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the picture.",
      });
    else res.send(data);
  });
};

exports.findPictureById = (req, res) => {
  Picture.findById(req.params.idkuva, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Didn't find any picture with id ${req.params.idkuva}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving a picture with id " + req.params.idkuva,
        });
      }
    } else res.send(data);
  });
};
