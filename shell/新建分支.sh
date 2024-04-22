#!/bin/bash

echo "请选择你要新建分支的项目:"

source d:/power/SpringLoach.github.io/shell/common_path.sh

read -p "输入从主干克隆的分支名(注意，该操作会丢弃本地修改)：" branch_name

#create new branch from master
echo "==========================目标分支 $branch_name=========================="
git checkout .				     # 丢弃本地修改
git switch master                # 切换到主干
git pull                         # 从远程拉取最新代码到本地
git checkout -b $branch_name     # 克隆最新主干分支
echo "success!! 准备打开项目"
code $path                       # 用vscode打开特定目录
sleep 2                          # 等待2秒