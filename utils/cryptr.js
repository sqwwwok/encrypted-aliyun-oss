const Cryptr = require("cryptr");
const { cryptrKey } = require("../config.json");

const cryptr = new Cryptr(cryptrKey);

function encryptr(input = "") {
  return cryptr.encrypt(input);
}

function decryptr(input = "") {
  return cryptr.decrypt(input);
}

function encryptBuffer(input = Buffer.from()) {
  return Buffer.from(encryptr(input.toString("utf8")), "utf8");
}

function decryptBuffer(input = Buffer.from()) {
  return Buffer.from(decryptr(input.toString("utf8")), "utf8");
}

module.exports = {
  encryptr,
  decryptr,
  encryptBuffer,
  decryptBuffer,
};
