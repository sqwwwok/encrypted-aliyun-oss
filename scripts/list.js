const oss = require("../utils/oss");
const { encryptr, decryptr, encryptBuffer } = require("../utils/cryptr");

// 输出所有解密后的OSS文件名
async function listCloudFiles(fileName) {
  const allCloudFiles = await oss.list();
  return allCloudFiles.map(({ name }) => decryptr(name));
}

(() => {
  if (require.main === module) {
    listCloudFiles().then(console.log);
  }
})();

module.exports = listCloudFiles;
