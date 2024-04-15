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

read -p "输入项目路径：" path
new_path=$(lowercase_first_letter "$path")
cd $new_path

read -p "输入从主干克隆的分支名(注意，该操作会丢弃本地修改)：" branch_name

#create new branch from master
if [ $branch_name ]
then
    echo "==========================目标分支 $branch_name=========================="
	git checkout .				     # 丢弃本地修改
	git switch master                # 切换到主干
	git pull                         # 从远程拉取最新代码到本地
	git checkout -b $branch_name     # 克隆最新主干分支
    echo "success!!"
    sleep 2                          # 等待2秒
else
	echo "sorry, program operation requires specifying parameters"
fi


