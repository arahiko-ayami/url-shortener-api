const shortenedUrlModel = require("../models/shortenedUrl");
const nanoid = require("../helpers/nanoid");

const Message = require("../constants/message");

const createShortenedUrl = async (obj) => {
  const { id, url, password } = obj;
  let _id = id || (await nanoid());

  let isExist = await shortenedUrlModel.findOne({ _id });

  if (isExist && id) {
    throw new Error(Message.CONFLICT);
  }

  while (isExist && !id) {
    _id = await nanoid();
    console.log(1);
    isExist = await getShortenedUrl({ _id });
  }

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
