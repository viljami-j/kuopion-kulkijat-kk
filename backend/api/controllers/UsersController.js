const UsersPublic = require("../models/users-public.model.js");

exports.getPublicData = (req, res) => {
  UsersPublic.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving public user data.",
      });
    else res.send(data);
  });
};
