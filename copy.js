const ora = require("ora");
const path = require("path");
const { asyncForEach, checkRemotePath } = require("./utils");

module.exports = function(options) {
  const { filesInfo, sftpConfig, sftp } = options;
  const total = filesInfo.length;
  const size = filesInfo.reduce((preVal, cVal) => preVal + cVal.size, 0);
  const spinner = ora("开始传输文件... \n").start();

  ora().info(`总共 ${total} 个文件, 大小总计 ${size} 字节 需要传输 ... \n`);

  asyncForEach(filesInfo, (info, index, array) => {
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
        spinner.text = `传输: ${((index * 100) / array.length).toFixed(
          2
        )}% ${absRemotePath}`;
        if (index === array.length - 1) {
          spinner.succeed("传输: 100%");
          sftp.end();
        }
      });
      return true;
    }
  });
};
