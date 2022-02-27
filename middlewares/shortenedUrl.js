const logger = require("../helpers/winston");
const apiResponse = require("../helpers/apiResponse");

const Message = require("../constants/message");
const Status = require("../constants/status");

const isValidUrl = async (req, res, next) => {
  if (!req.body || !req.body.url) {
    return res
      .status(Status.BAD_REQUEST)
      .json(apiResponse(Status.BAD_REQUEST, Message.BAD_REQUEST));
  }
  const regex = new RegExp(
    "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$"
  );
  if (!regex.test(req.body.url)) {
    return res
      .status(Status.BAD_REQUEST)
      .json(apiResponse(Status.BAD_REQUEST, "Provide a valid url"));
  }
  next();
};

module.exports = { isValidUrl };
