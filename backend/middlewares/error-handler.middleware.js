const { HttpError } = require("http-errors");

function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).send(err.message);
  }

  res.status(500).send("Internal Server Error");
}

module.exports = errorHandler;
