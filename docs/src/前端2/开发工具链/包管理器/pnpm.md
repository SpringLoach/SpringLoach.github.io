# pnpm

pnpm 是一个快速、节省磁盘空间的 Node.js 包管理器。

## 安装 pnpm

```bash
# 使用 npm 安装
npm install -g pnpm

# 或者使用其他方法（如独立脚本）
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## 基本命令

### 初始化项目
```bash
pnpm init
```

### 安装依赖
```bash
# 安装项目所有依赖（类似 npm install）
pnpm install

# 添加生产依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>

# 添加全局依赖
pnpm add -g <package-name>
```

### 运行脚本
```bash
pnpm run <script-name>
# 例如
pnpm run dev
```

### 更新依赖
```bash
# 更新特定包
pnpm up <package-name>

# 更新所有包
pnpm up
```

### 移除依赖
```bash
pnpm remove <package-name>
```

## 高级功能

### 工作空间 (Workspaces)
```bash
# 在项目根目录创建 pnpm-workspace.yaml
packages:
  - 'packages/*'
```

### 仅安装生产依赖
```bash
pnpm install --prod
```

### 查看依赖树
```bash
pnpm list
```

### 执行包中的命令
```bash
pnpm exec <command>
```

### 存储管理
```bash
# 查看存储位置
pnpm store path

# 清理不需要的包
pnpm store prune
```

## 与 npm/yarn 命令对比

| 功能         | npm                    | yarn                | pnpm                |
| ------------ | ---------------------- | ------------------- | ------------------- |
| 安装依赖     | `npm install`          | `yarn`              | `pnpm install`      |
| 添加依赖     | `npm install <pkg>`    | `yarn add <pkg>`    | `pnpm add <pkg>`    |
| 添加开发依赖 | `npm install -D <pkg>` | `yarn add -D <pkg>` | `pnpm add -D <pkg>` |
| 删除依赖     | `npm uninstall <pkg>`  | `yarn remove <pkg>` | `pnpm remove <pkg>` |
| 运行脚本     | `npm run <script>`     | `yarn <script>`     | `pnpm run <script>` |

pnpm 的主要优势在于其高效的磁盘空间利用和快速的安装速度，它通过硬链接和符号链接来共享依赖。
