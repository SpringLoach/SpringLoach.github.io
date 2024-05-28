### 安装教程

https://blog.csdn.net/qq_22182989/article/details/125387145



### 安装node.js官方包

> 根据[教程](https://zhuanlan.zhihu.com/p/558784826)，可以从[官方](https://nodejs.org/download/release/)上找到任意版本的包进行安装，window 版本的命名如下：
>
> ```shell
> node-v14.20.0-x64.msi  
> ```



### 常用命令

查看所有安装的 node.js 版本

```elm
nvm ls
```

查看所有可以直接（通过命令行）安装的 node.js 版本

```elm
nvm list available
```

安装 16.15.0 版本的 node.js

```elm
nvm install 16.15.0
```

切换当前使用的 node.js 版本

```elm
nvm use 16.15.0
```

查看当前 node.js 版本

```elm
node -v
```

 卸载 16.15.0 版本的 node.js

```elm
nvm uninstall 16.15.0
```



### nvm下npm安装yarn，找不到程序

> 想使用`pnpm` ，也可以进行类似的处理

```
无法将“yarn”项识别为 cmdlet、函数、脚本文件或可运行程序的名称
```



1. 先尝试在某个node版本下安装 `yarn`

```shell
npm install yarn -g
```



2. 在 nvm 的安装目录下，在 `nvm/nodejs` 文件夹中找到了对应的一些 yarn 文件（不同于教程中的 `node_global `），将它们复制到了上一层 `nvm`



3. 在 `nvm/nodejs/node_modules` 中将 yarn 文件夹复制到了 `nvm/node_modules` （我是新增的）中



4. 在命令行可以正常查看到 `yarn` 版本

   ```shell
   yarn -v
   ```

   

