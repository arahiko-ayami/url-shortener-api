const shortenedUrl = require("./shortenedUrl");

const apiResponse = require("../helpers/apiResponse");
const Status = require("../constants/status");
const Message = require("../constants/message");

module.exports = (app) => {
  app.use("/url", shortenedUrl);
  app.all("/", (req, res) =>
    res.status(Status.OK).json(apiResponse(Status.OK, "This API is working"))
  );
  app.all("*", (req, res) =>
    res
      .status(Status.NOT_FOUND)
      .json(apiResponse(Status.NOT_FOUND, Message.NOT_FOUND))
  );
};
