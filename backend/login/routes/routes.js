module.exports = app => {
  const destinations = require("../controllers/controller.js");

  var router = require("express").Router();

  // Post uusi matkakohde
  router.post("/", destinations.create);

  // Get kaikki matkakohteet
  router.get("/", destinations.findAll);

  // Täs oli joku idea niitä privaatti juttuja varten mutta unohin sen jo :D
  router.get("/published", destinations.findAllPublished);

  // Get matkakohde id:llä
  router.get("/:idmatkakohde", destinations.findOne);

  // Update matkakohde id:llä
  router.put("/:idmatkakohde", destinations.update);

  // Delete matkakohde id:llä
  router.delete("/:idmatkakohde", destinations.delete);

  // Tarvittaessa voi ottaa käyttöön poista kaikki komento
  //router.delete("/", destinations.deleteAll);

  app.use('/api/destinations', router);
};
