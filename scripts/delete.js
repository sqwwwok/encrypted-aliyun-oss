const fs = require("fs");
const path = require("path");
const oss = require("../utils/oss");
const { decryptr, encryptr } = require("../utils/cryptr");

// 删除OSS上的文件
async function removeCloudFile(filename) {
  const cloudFiles = await oss.list();
  await Promise.all(
    cloudFiles.map(async (cloudFile) => {
      const oriFilename = decryptr(cloudFile.name);
      if (oriFilename === filename) {
        return await oss.remove(cloudFile.name);
      } else {
        return await Promise.resolve();
      }
    })
  );
}

(() => {
  if (require.main === module) {
    const files = process.argv.slice(2);
    files.forEach(removeCloudFile);
  }
})();

module.exports = {
  removeCloudFile,
};
