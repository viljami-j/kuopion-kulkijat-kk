const User = require("../controllers/controllerUser");
module.exports = (app) => {
  const destinations = require("../controllers/controller.js");
  const journeys = require("../controllers/JourneyController.js");
  const pictures = require("../controllers/PictureController.js");
  const stories = require("../controllers/StoriesController.js");
  const users = require("../controllers/UsersController.js");

  const router = require("express").Router();

  router.post("/destinations", destinations.create);
  router.get("/destinations", destinations.findAll);
  router.get("/destinations/published", destinations.findAllPublished);
  router.get("/destinations/:idmatkakohde", destinations.findById);
  router.put("/destinations/:idmatkakohde", destinations.updateById);
  router.delete("/destinations/:idmatkakohde", destinations.deleteById);

  //router.delete("/", destinations.deleteAll);

  router.get("/");

  router.get("/users/public", users.getPublicData);

  router.get("/user_journeys/:idmatkaaja", journeys.findJourneysByUserId);

  router.get("/stories/:storyId", stories.findById);
  router.post("/stories", stories.create);
  router.put("/stories/:storyId", stories.updateById);
  router.delete("/stories/:storyId", stories.deleteById);

  router.get("/pictures/:idkuva", pictures.findPictureById);
  router.post("/pictures", pictures.create);
  router.delete("/pictures/:idkuva", pictures.deletePictureById);

  app.use("/api", router);
};
module.exports = app2 => {


  const User = require("../controllers/controllerUser.js");

  var userRoutes = require("express").Router();

  userRoutes.get("/", User.findAll);

  userRoutes.get("/:idmatkaaja", User.findOne);

  userRoutes.put("/:idmatkaaja", User.update);

  app2.use("/api/users", userRoutes);
};
