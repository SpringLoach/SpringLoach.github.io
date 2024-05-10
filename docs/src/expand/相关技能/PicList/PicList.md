### 一、准备仓库和 Token

1. 注册 Github 账号，创建一个公开仓库
2. 生成token

- 点击页面右上角的头像 - Settings - Developer settings - Personal access token - Tokens(classic) - Generate new token (classic)

- | 配置项        | 说明                           |
  | ------------- | ------------------------------ |
  | Note          | token的描述                    |
  | Expiration    | 过期时间，设置为 No expiration |
  | Select scopes | 权限设置，勾选一级 `repo`      |

- 点击下方的 `Generate token` 生成 token，复制备用



### 二、下载软件并管理 Github

进入[官网](https://piclist.cn/) - 点击下载 - 找到最新版本中 Windows 系统的 `-x64.exe` 文件下载

点击图层 - Github - 进行配置

- | 配置项         | 示例                  | 说明                            |
  | -------------- | --------------------- | ------------------------------- |
  | 图床配置名     | MyPic                 | 用于软件中显示                  |
  | 设定仓库名     | SpringLoach/img_store | 要存在对应的仓库                |
  | 设定分支名     | main                  |                                 |
  | 设定Token      |                       | 之前从github获取的token粘贴过来 |
  | 设定存储路径   | img/                  | 存储到仓库的位置                |
  | 设定自定义域名 |                       | img/                            |

点击上传 - 将上方的图床修改为刚刚创建的图片配置，此时可以进行图片上传

点击相册 - 可以查看上传记录



### 三、开启更方便的图床管理

管理 - Github - 按下面配置好后保存即可在软件对图片进行管理

- | 配置项      | 示例        | 说明                                 |
  | ----------- | ----------- | ------------------------------------ |
  | 别名        | SpringLoach | 用于软件中显示，随便填               |
  | Token       |             | 之前从github获取的token粘贴过来      |
  | 用户名      | SpringLoach | Github用户名                         |
  | 代理地址    |             | 如果访问Github需要代理地址访问，则填 |
  | CDN加速域名 |             | 按需填                               |

  

参考链接：

https://blog.csdn.net/liuxyong515/article/details/134908683

https://blog.csdn.net/liuxyong515/article/details/135232268