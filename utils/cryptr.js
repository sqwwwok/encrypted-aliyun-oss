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
  return Buffer.from(encryptr(input.join(",")));
}

function decryptBuffer(input = Buffer.from()) {
  return Buffer.from(decryptr(input.toString()).split(","));
}

module.exports = {
  encryptr,
  decryptr,
  encryptBuffer,
  decryptBuffer,
};
