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
    "((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)"
  );
  if (!regex.test(req.body.url)) {
    return res
      .status(Status.BAD_REQUEST)
      .json(apiResponse(Status.BAD_REQUEST, "Provide a valid url"));
  }
  next();
};

module.exports = { isValidUrl };
