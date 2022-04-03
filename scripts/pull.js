const fs = require("fs");
const path = require("path");
const oss = require("../utils/oss");
const { decryptr, decryptBuffer } = require("../utils/cryptr");

/** 将OSS上的加密文件同步到本地
 *
 * @param {string} filename 加密前的文件名称，可以先用list查看oss上有哪些文件
 * @returns
 */
async function pullCloudFile(filename) {
  const cloudFiles = await oss.list();
  const targetCloudFile = cloudFiles.find(
    (cloudFile) => decryptr(cloudFile.name) === filename
  );
  if (targetCloudFile) {
    const encryptedFileContent = await oss.get(targetCloudFile.name);
    const filePath = path.resolve(
      process.cwd(),
      decryptr(targetCloudFile.name)
    );
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, decryptBuffer(encryptedFileContent), {
      flag: "wx",
    });
    return await Promise.resolve();
  } else {
    return await Promise.reject(`Cloud file not found: ${filename}`);
  }
}

(() => {
  if (require.main === module) {
    const files = process.argv.slice(2);
    files.forEach(pullCloudFile);
  }
})();

module.exports = pullCloudFile;
