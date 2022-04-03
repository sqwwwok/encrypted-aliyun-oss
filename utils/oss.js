const OSS = require("ali-oss");
const { ossConfig } = require("../config.json");

const client = new OSS({
  region: ossConfig.region,
  accessKeyId: ossConfig.accessKeyId,
  accessKeySecret: ossConfig.accessKeySecret,
  bucket: ossConfig.bucket,
});

async function list() {
  const res = await client.list();
  return res.objects;
}

async function put(name = "", buffer = Buffer.from()) {
  const res = await client.put(name, buffer);
  return res;
}

async function remove(name = "") {
  const res = await client.delete(name);
  return res;
}

async function get(name = "") {
  const result = await client.get(name);
  return result.content;
}

module.exports = {
  list,
  put,
  get,
  remove,
};
