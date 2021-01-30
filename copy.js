const ora = require("ora");
const path = require("path");
const { asyncForEach, checkRemotePath } = require("./utils");

module.exports = function(options) {
  const { filesInfo, sftpConfig, sftp } = options;
  const currentFilesInfo = filesInfo.filter(info => !info.isDirectory);
  const total = currentFilesInfo.length;
  const size = currentFilesInfo.reduce((preVal, cVal) => preVal + cVal.size, 0);
  const spinner = ora("开始传输文件... \n").start();
  let currentSize = 0;
  let hasPublishedFile = 0;

  ora().info(`总共 ${total} 个文件, 大小总计 ${size} 字节 需要传输 ... \n`);

  asyncForEach(filesInfo, info => {
    const absBasePath = path.join(process.cwd(), sftpConfig.localPath);
    const absLocalPath = path.join(process.cwd(), info.path);
    const absRemotePath = path
      .join(sftpConfig.remotePath, absLocalPath.replace(absBasePath, ""))
      .replace(/\\/g, "/");

    checkRemotePath({
      ...sftpConfig,
      remotePath: absRemotePath
    });

    if (info.isDirectory) {
      return sftp.mkdir(absRemotePath, true);
    } else {
      sftp.fastPut(absLocalPath, absRemotePath).then(() => {
        hasPublishedFile++;
        currentSize += info.size
        spinner.text = `传输: ${((currentSize * 100) / size).toFixed(
          2
        )}% ${absRemotePath} ${info.size} 字节`;
        if (hasPublishedFile === total) {
          spinner.succeed("传输: 100%");
          sftp.end();
        }
      });
      return true;
    }
  });
};
