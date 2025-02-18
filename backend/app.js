var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const routes = require("./routes");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler.middleware");

require("./db");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: ["http://localhost:4200", "http://localhost:4201"],
    credentials: true,
  })
);

app.use("/products", routes);

app.use(errorHandler);

module.exports = app;
