const Picture = require("../models/picture.model.js");

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
