var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var authenticationRouter = require("./routes/authentication.router");
const mongoose = require("mongoose");
require('dotenv/config')
var app = express();

//connect mongodb
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_connection, { useUnifiedTopology: true, useNewUrlParser: true}, () => {
  console.log("Connected to DB");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Router
app.use("/auth", authenticationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.message);
});

module.exports = app;