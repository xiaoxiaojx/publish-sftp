#!/usr/bin/env node

const ora = require("ora");
const Client = require("ssh2-sftp-client");
const program = require("commander");
const pkg = require("./package.json");
const { getFilesInfo, getSftpConfig, formatSftpConfig } = require("./utils");
const copy = require("./copy");
const remove = require("./remove");

const sftp = new Client();
const spinner = ora();
const sftpConfig = getSftpConfig();

require('events').EventEmitter.defaultMaxListeners = 30;

program
  .version(pkg.version)
  .option("-c, --copy [dir]", "copy file.")
  .option("-r, --remove [dir]", "remove file.")
  .parse(process.argv);

function handle() {
  const fmtSftpConfig = formatSftpConfig(
    sftpConfig,
    program.remove || program.copy
  );
  const options = {
    sftp,
    sftpConfig: fmtSftpConfig,
    filesInfo: getFilesInfo(fmtSftpConfig.localPath)
  };
  switch (true) {
    case Boolean(program.remove):
      remove(options);
      break;
    case Boolean(program.copy):
      copy(options);
      break;
  }
}

sftp.on("ready", () => {
  spinner.succeed("SSH2-SFTP-Client: 已经连接 !");
});

sftp.on("end", () => {
  spinner.succeed("SSH2-SFTP-Client: 断开连接 !");
});

sftp
  .connect(sftpConfig.connect)
  .then(handle)
  .catch(err => {
    throw err
  });
