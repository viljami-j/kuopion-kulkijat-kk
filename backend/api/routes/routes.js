const User = require("../controllers/controllerUser");
module.exports = (app) => {
  const destinations = require("../controllers/controller.js");
  const journeys = require("../controllers/JourneyController.js");
  const pictures = require("../controllers/PictureController.js");
  const stories = require("../controllers/StoriesController.js");
  const users = require("../controllers/UsersController.js"); // -> NOTED DURING TASK #107:
  const User = require("../controllers/controllerUser.js"); // -> These two should be merged during later refactoring.

  const router = require("express").Router();

  router.post("/destinations", destinations.create);
  router.get("/destinations", destinations.findAll);
  router.get("/destinations/published", destinations.findAllPublished);
  router.get("/destinations/:idmatkakohde", destinations.findById);
  router.put("/destinations/:idmatkakohde", destinations.updateById);
  router.delete("/destinations/:idmatkakohde", destinations.deleteById);

  //router.delete("/", destinations.deleteAll);

  router.get("/users/public", users.getPublicData);

  //router.get("/", User.findAll); // DISABLED DURING TASK #107 due to routes clashing with another endpoint. Both route + method are also likely deprecated
  router.get("/users/:idmatkaaja", User.findOne);
  router.put("/users/:idmatkaaja", User.update);

  router.get("/user_journeys/:idmatkaaja", journeys.findJourneysByUserId);
  router.get("/journeys", journeys.getAllPublic);
  router.get("/journeys/:idmatka", journeys.findJourneysByJourneyId);

  router.get("/stories/:storyId", stories.findById);
  router.post("/stories", stories.create);
  router.put("/stories/:storyId", stories.updateById);
  router.delete("/stories/:storyId", stories.deleteById);

  router.get("/pictures/:idkuva", pictures.findPictureById);
  router.post("/pictures", pictures.create);
  router.delete("/pictures/:idkuva", pictures.deletePictureById);

  app.use("/api", router);
};
