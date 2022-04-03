const fs = require("fs");
const path = require("path");
const oss = require("../utils/oss");
const { decryptr, decryptBuffer } = require("../utils/cryptr");

// 将OSS上的所有加密文件同步到本地
async function update() {
  const cloudFiles = await oss.list();
  await Promise.all(
    cloudFiles.map(async (cloudFile) => {
      const cloudContent = await oss.get(cloudFile.name);
      const filePath = path.resolve(process.cwd(), decryptr(cloudFile.name));
      const contentDecrypted = decryptBuffer(cloudContent);
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      fs.writeFileSync(filePath, contentDecrypted, { flag: "wx" });
      return await Promise.resolve();
    })
  );
}

(() => {
  if (require.main === module) {
    update();
  }
})();

module.exports = {
  update,
};
