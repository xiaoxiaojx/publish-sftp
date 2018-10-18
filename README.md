# publish-sftp
> sftp cli publish.

### install
```
    sudo npm i publish-sftp -g
    sudo npm link publish-sftp
```

### tips
> 当前目录下需要提供一份 sftp.json
```
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

### example
![image](https://user-gold-cdn.xitu.io/2018/10/18/16687b0ddcd3a2a4?w=828&h=234&f=jpeg&s=48490)
> 复制 localPath 下所有文件到 remotePath/xjx/test, -c 参数为空则是复制到 remotePath, 远程目录不存在会先创建

### copy
> 复制 localPath 下所有文件到 remotePath 目录下, 如果 xxx 有值则是复制到 `${remotePath}/${xxx}` 目录
```
publish-sftp -c xxx
```

### remove
> 删除 remotePath 目录, 如果 xxx 有值则是删除 `${remotePath}/${xxx}` 目录
```
publish-sftp -r xxx
```