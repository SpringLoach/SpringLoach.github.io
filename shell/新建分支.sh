#!/bin/bash

# 函数：将字符串的首字母转换为小写
# 参数 $1: 输入字符串
# 返回值：首字母小写的字符串
lowercase_first_letter() {
    local word="$1"
    local first_char="${word:0:1}"
    local rest="${word:1}"
    local lower_first_char=$(echo "$first_char" | tr '[:upper:]' '[:lower:]')
    echo "${lower_first_char}${rest}"
}

echo "请选择你要新建分支的项目:"

select opt in "自定义路径" "erp-admin" "lbdj-pc-website" "lbdj-app-h5" "lbdj-team-app-h5" "lbdj-order-app-h5" "lbdj-wap" "worker-mini-program" "xd-mini-program" "退出"; do
  case $opt in
    "自定义路径")
      read -p "输入项目路径：" origin_path
      path=$(lowercase_first_letter "$origin_path")
      break
      ;;
    "erp-admin")
      path='d:\项目\erp-admin'
      break
      ;;
    "lbdj-pc-website")
      path='d:\备用项目\lbdj-pc-website'
      break
      ;;
    "lbdj-app-h5")
      path='d:\备用项目\lbdj-app-h5'
      break
      ;;
    "lbdj-team-app-h5")
      path='d:\项目\lbdj-team-app-h5'
      break
      ;;
    "lbdj-order-app-h5")
      path='d:\项目\lbdj-order-app-h5'
      break
      ;;
    "lbdj-wap")
      path='d:\项目\lbdj-wap'
      break
      ;;
    "worker-mini-program")
      path='d:\项目\worker-mini-program'
      break
      ;;
    "xd-mini-program")
      path='d:\项目\D:\项目\xd-mini-program'
      break
      ;;
    "退出")
      echo "退出程序"
      exit
      break
      ;;
    *) echo "无效的选项 $REPLY";;
  esac
done

cd $path

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