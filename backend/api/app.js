const express = require("express");
const session = require("express-session");
const path = require("path");
const pageRouter = require("./routes/pages");
const app = express();
const cors = require("cors");
app.use(cors(corsOptions));
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(express.static(path.join(__dirname, "public")));
require("./routes/routes.js")(app);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    secret: "setti",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 30,
    },
  })
);

app.use("/", pageRouter);

// app.use((req, res, next) => {
//   var err = new Error("Page not found");
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send(err.message);
// });

app.listen(3006, () => {
  console.log("server is running on port 3006");
});

module.exports = app;
