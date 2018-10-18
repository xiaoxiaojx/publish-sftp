const ora = require('ora');
const {
    checkRemotePath,
    confirm
} = require("./utils")

module.exports = async function (options) {
    const {
        sftpConfig,
        sftp
    } = options;
    const {
        remotePath,
        protectedRemotePath
    } = sftpConfig

    checkRemotePath(sftpConfig);

    const answer = await confirm(`请输入 yes 确认删除 ${remotePath} 目录! \n`)

    if (answer !== "yes") {
        ora().fail("本次操作已经安全退出 !")
        sftp.end()
        return;
    }

    if (remotePath === protectedRemotePath) {
        ora().fail("不能删除受保护的目录 !")
        sftp.end()
        return;
    }

    const spinner = ora(`开始删除 ${remotePath} 目录... \n`).start();

    sftp.rmdir(remotePath, true)
        .then(() => {
            spinner.succeed("所有文件删除成功 !")
            sftp.end()
        })
        .catch(err => {
            spinner.fail(err)
            sftp.end()
        })
}