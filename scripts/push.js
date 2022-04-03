const fs = require("fs");
const oss = require("../utils/oss");
const { encryptr, decryptr, encryptBuffer } = require("../utils/cryptr");

// 加密本地文件后上传到OSS
async function pushFile(fileName) {
  // 清理同名的OSS文件
  const allCloudFiles = await oss.list();
  await Promise.all(
    allCloudFiles.map(async (cloudFile) => {
      if (decryptr(cloudFile.name) === fileName) {
        return await oss.remove(cloudFile.name);
      } else {
        return await Promise.resolve();
      }
    })
  );

  // 上传本地文件到OSS
  const encryptedFileName = encryptr(fileName);
  const contentEncrypted = encryptBuffer(fs.readFileSync(fileName));
  return await oss.put(encryptedFileName, contentEncrypted);
}

(() => {
  if (require.main === module) {
    const files = process.argv.slice(2);
    files.forEach(pushFile);
  }
})();

module.exports = pushFile;
