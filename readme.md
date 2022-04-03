# encrypted-aliyun-oss

使用 AES 加密，在阿里云 OSS 上存储文件

# Usage

首先修改`config.json`中的内容，改为你自己的阿里云 OSS 服务配置，并修改加密用的密钥。

```js
{
  // 密钥
  "cryptrKey": "uQDf0AZiVR",
  // 阿里云OSS配置
  "ossConfig": {
    "region": "oss-cn-beijing",
    "accessKeyId": "uQDf0AZiVR",
    "accessKeySecret": "uQDf0AZiVR",
    "bucket": "my-bucket"
  }
}
```

## 上传文件

```sh
node scripts/push.js /your/file/path
```

## 下载文件

```sh
node scripts/pull.js /your/oss/file/name/before/encrypted
```

## 列出 OSS 上存储的加密文件

```sh
node scripts/list.js
```

## 下载所有的 OSS 文件

```sh
node scripts/clone.js
```
