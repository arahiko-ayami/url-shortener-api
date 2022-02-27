const mongoose = require("mongoose");
const logger = require("../helpers/winston");
require("dotenv").config();
const dbUri = process.env.MONGO_URI;

if (dbUri) {
  mongoose.connect(
    dbUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info("Connected to MongoDB");
      }
    }
  );
} else logger.error("Please config MONGO_URI in .env file.");

module.exports = mongoose;
