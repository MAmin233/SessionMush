const crypto = require("crypto");

function generateRandomString(length) {
  return crypto
    .randomBytes(length)
    .toString("base64")
    .slice(0, length);
}

module.exports = generateRandomString;
