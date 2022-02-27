const express = require("express");
const router = express.Router();

const apiResponse = require("../helpers/apiResponse");
const Status = require("../constants/status");
const Message = require("../constants/message");

const ShortenedUrlController = require("../controllers/shortenedUrl");
const { isValidUrl } = require("../middlewares/shortenedUrl");

router.use("/create", isValidUrl);
router.get("/", ShortenedUrlController.getShortenedUrl);
router.post("/create", ShortenedUrlController.createShortenedUrl);
router.all("/", (req, res) => {
  res
    .status(Status.METHOD_NOT_ALLOWED)
    .json(apiResponse(Status.METHOD_NOT_ALLOWED, Message.METHOD_NOT_ALLOWED));
});

module.exports = router;
