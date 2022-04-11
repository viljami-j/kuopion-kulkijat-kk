module.exports = (app) => {
  const destinations = require("../controllers/controller.js");
  const journeys = require("../controllers/JourneyController.js");
  const pictures = require("../controllers/PictureController.js");

  const router = require("express").Router();

  router.post("/destinations", destinations.create);

  router.get("/destinations", destinations.findAll);

  router.get("/destinations/published", destinations.findAllPublished);

  router.get("/destinations/:idmatkakohde", destinations.findById);

  router.put("/destinations/:idmatkakohde", destinations.updateById);

  router.delete("/destinations/:idmatkakohde", destinations.deleteById);

  //router.delete("/", destinations.deleteAll);

  router.get("/");

  router.get("/user_journeys/:idmatkaaja", journeys.findJourneysByUserId);

  router.get("/pictures/:idkuva", pictures.findPictureById);

  app.use("/api", router);
};
