const shortenedUrlModel = require("../models/shortenedUrl");
const nanoid = require("../helpers/nanoid");

const createShortenedUrl = async (obj) => {
  const { url, password } = obj;
  const _id = await nanoid();

  await shortenedUrlModel.create({
    _id,
    url,
    password,
  });

  return _id;
};

const getShortenedUrl = async (obj) => {
  const { id } = obj;
  return shortenedUrlModel.findOne({
    _id: id,
  });
};

module.exports = {
  createShortenedUrl,
  getShortenedUrl,
};
