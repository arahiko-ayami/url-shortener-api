const mongoose = require("../config/mongo");

const shortenedUrl = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

module.exports = mongoose.model("ShortenedUrl", shortenedUrl);
