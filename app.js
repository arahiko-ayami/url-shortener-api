const express = require("express");
const cors = require("cors");
const logger = require("./helpers/winston");
const morganMiddleware = require("./helpers/morgan");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const Status = require("./constants/status");
const Message = require("./constants/message");
const apiResponse = require("./helpers/apiResponse");

const app = express();

app.use(morganMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (err, req, res, next) {
  if (err.name === "SyntaxError") {
    return res
      .status(Status.BAD_REQUEST)
      .json(apiResponse(Status.BAD_REQUEST, "Invalid JSON"));
  }
  return res
    .status(Status.INTERNAL_SERVER_ERROR)
    .json(
      apiResponse(Status.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR)
    );
});
require("./routes")(app);

app.listen(PORT, () => {
  logger.info(`Listening on ${PORT}`);
});
