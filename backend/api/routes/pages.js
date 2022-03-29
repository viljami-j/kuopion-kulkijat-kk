const express = require("express");
const User = require("../models/users.js");
const router = express.Router();

const user = new User();

router.get("", (req, res, next) => {
  let user = req.session.user;
  if (user) {
    res.redirect("/home");
    return;
  }
  res.render("index", { title: "my app" });
});

router.get("/home", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    res.render("home", { opp: req.session.opp, name: user.email });
    return;
  }
  res.redirect("/");
});

router.post("/login", (req, res, next) => {
  user.login(req.body.email, req.body.password, function (result) {
    if (result) {
      req.session.user = result;
      req.session.opp = 1;

      res.status(200).send({ message: "Login ok" });
    } else {
      res.status(401).send({ message: "email/password incorrect" });
    }
  });
});

router.post("/register", (req, res, next) => {
  let userInput = {
    email: req.body.email,
    password: req.body.password,
  };

  user.create(userInput, function (lastId) {
    if (lastId) {
      user.find(lastId, function (result) {
        req.session.user = result;
        req.session.opp = 0;
        res.status(201).send({ message: "New user created." });
      });
    } else {
      console.log("Error creating new user");
    }
  });
});

router.get("/logout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(function () {
      res.redirect("/");
    });
  }
});

module.exports = router;
