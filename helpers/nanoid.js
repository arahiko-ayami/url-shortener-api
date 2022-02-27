const { customAlphabet } = require("nanoid/async");

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

module.exports = nanoid;
