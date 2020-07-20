const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyparser = require("body-parser");

var indexRouter = require("./api/routes/index");
var rq1Router = require("./api/routes/rq1");
// var dataRouter = require("./api/routes/data");

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
    },
  })
);

app.use("/", indexRouter);
app.use("/rq1", rq1Router);
// app.use("/api", dataRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
