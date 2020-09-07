const path = require("path");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// app.use(function (err, req, res, next) {
//   console.error(err);
//   res.status(500).send("Something broke!");
// });

app.listen(5000, function(){
  console.log('port 5000 open')
});

module.exports = app;
