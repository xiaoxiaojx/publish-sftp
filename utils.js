const fs = require("fs");
const path = require("path");
const readline = require("readline");

function traverseFile(fn) {
  return function traverse(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`${filePath} 不存在!`);
    }
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fn(filePath, stat);
      fs.readdirSync(filePath).forEach(file => traverse(`${filePath}/${file}`));
    } else {
      fn(filePath, stat);
    }
  };
}

function getFilesInfo(filePath) {
  const filesInfo = [];
  traverseFile((currentFilePath, stat) => {
    filesInfo.push({
      size: stat.size,
      path: currentFilePath,
      isDirectory: stat.isDirectory()
    });
  })(filePath);
  return filesInfo;
}

function getSftpConfig() {
  const sftpPath = path.join(process.cwd(), "./sftp.json");
  if (fs.existsSync(sftpPath)) {
    return JSON.parse(fs.readFileSync(sftpPath, "utf-8"));
  } else {
    throw new Error("当前目录下未找到 sftp.json 文件!");
  }
}

function checkRemotePath(sftpConfig) {
  const { remotePath, protectedRemotePath } = sftpConfig;
  if (remotePath.indexOf(protectedRemotePath) !== 0) {
    throw new Error(`只允许操作 ${protectedRemotePath} 路径下文件`);
  }
}

function formatSftpConfig(sftpConfig, inputPath) {
  const remotePath =
    inputPath &&
    typeof inputPath === "string" &&
    inputPath.trim() &&
    inputPath.trim() !== "/" &&
    inputPath.trim() !== "\\"
      ? `${sftpConfig.remotePath}/${inputPath}`
      : sftpConfig.remotePath;

  return {
    ...sftpConfig,
    remotePath
  };
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function confirm(msg) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(res => {
    rl.question(msg, answer => {
      rl.close();
      res(answer);
    });
  });
}

module.exports = {
  traverseFile,
  getFilesInfo,
  getSftpConfig,
  formatSftpConfig,
  asyncForEach,
  checkRemotePath,
  confirm
};
