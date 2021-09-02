<p align="center">
  <img src="https://user-images.githubusercontent.com/23253540/131888591-5be715cb-6d87-4faa-aaf2-42714b1aaf10.png" width="200" alt="Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">One-line command to quickly publish resources to a specified server..</p>
    <p align="center">
<a href="https://www.npmjs.com/~publish-sftp" target="_blank"><img src="https://img.shields.io/npm/v/publish-sftp.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~publish-sftp" target="_blank"><img src="https://img.shields.io/npm/l/publish-sftp.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~publish-sftp" target="_blank"><img src="https://img.shields.io/npm/dm/publish-sftp.svg" alt="NPM Downloads" /></a>
</p>

### Usage
> Add sftp.json to the root of the project
```
// ./sftp.json
{
    "localPath": "./dist",
    "remotePath": "/export/App/xxx",
    "protectedRemotePath": "/export/App/xxx",
    "connect": {
        "host": "xxx.xxx.xxx.xx",
        "port": 22,
        "username": "root",
        "password": "123456"
    }
}
```

### Getting started
```
yarn add publish-sftp
```
![image](https://pic4.zhimg.com/80/v2-e403806e29315abb62e339fe555d55f4_1440w.png)
> 复制 localPath 下所有文件到 remotePath/xjx/test, -c 参数为空则是复制到 remotePath, 远程目录不存在会先创建

#### copy
> 复制 localPath 下所有文件到 remotePath 目录下, 如果 xxx 有值则是复制到 `${remotePath}/${xxx}` 目录
```
publish-sftp -c xxx
```

#### remove
> 删除 remotePath 目录, 如果 xxx 有值则是删除 `${remotePath}/${xxx}` 目录
```
publish-sftp -r xxx
```

### Tips
> protectedRemotePath 字段为避免误操作增加，删除等危险操作涉及到该目录会立即终止 ⚠️
