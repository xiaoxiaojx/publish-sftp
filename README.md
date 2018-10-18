# publish-sftp
> sftp cli publish.

### install
```
    npm i publish-sftp -D
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
![image](https://pic1.zhimg.com/80/v2-dd53b72bd33887e9f8289f6a34c09ff3_hd.png)

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