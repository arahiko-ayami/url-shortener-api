const ShortenedUrlService = require("../services/shortenedUrl");
const logger = require("../helpers/winston");
const apiResponse = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");

const Message = require("../constants/message");
const Status = require("../constants/status");

const createShortenedUrl = async (req, res) => {
  try {
    let { url, password } = req.body;

    if (password) {
      password = await bcrypt.hash(password, 10);
    }

    const id = await ShortenedUrlService.createShortenedUrl({ url, password });
    return res
      .status(Status.CREATED)
      .json(apiResponse(Status.CREATED, Message.CREATED, { id }));
  } catch (error) {
    logger.error(error);
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json(
        apiResponse(Status.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR)
      );
  }
};

const getShortenedUrl = async (req, res) => {
  try {
    if (!req.body || !req.body.id) {
      return res
        .status(Status.BAD_REQUEST)
        .json(apiResponse(Status.BAD_REQUEST, Message.BAD_REQUEST));
    }

    const { id, password } = req.body;
    const shortenedUrl = await ShortenedUrlService.getShortenedUrl({
      id,
    });

    if (!shortenedUrl) {
      return res
        .status(Status.NOT_FOUND)
        .json(apiResponse(Status.NOT_FOUND, Message.NOT_FOUND));
    }

    if (!password && shortenedUrl.password) {
      return res
        .status(Status.UNAUTHORIZED)
        .json(apiResponse(Status.UNAUTHORIZED, Message.UNAUTHORIZED));
    } else if (password && shortenedUrl.password) {
      const compareResult = await bcrypt.compare(
        password,
        shortenedUrl.password
      );

      if (!compareResult) {
        return res
          .status(Status.UNAUTHORIZED)
          .json(apiResponse(Status.UNAUTHORIZED, Message.UNAUTHORIZED));
      }
    }

    return res.status(Status.OK).json(
      apiResponse(Status.OK, Message.OK, {
        id: shortenedUrl._id,
        url: shortenedUrl.url,
        createdAt: shortenedUrl.createdAt,
      })
    );
  } catch (error) {
    logger.error(error);
    return res
      .status(Status.INTERNAL_SERVER_ERROR)
      .json(
        apiResponse(Status.INTERNAL_SERVER_ERROR, Message.INTERNAL_SERVER_ERROR)
      );
  }
};

module.exports = {
  createShortenedUrl,
  getShortenedUrl,
};
