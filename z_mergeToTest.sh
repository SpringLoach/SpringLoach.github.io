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

target_branch=test_11.4
echo "默认分支为${target_branch}，是否合并到该分支？"
read -p "输入y或n：" answer

if [ $answer != 'y' ]
then
    read -p "输入需要合并到的测试分支：" target_branch
fi

# read -p "输入需要合并到的测试分支：" target_branch

current_branch=$(git branch --show-current)

#Push local branch to test branch
git checkout .				            # 丢弃本地修改
git switch ${target_branch}             # 切换到测试分支
git pull                                # 从远程拉取最新代码到本地
echo "当前分支: ${current_branch}"
git merge ${current_branch} --no-edit # 将本地原分支合并到测试分支-不加评价
# git merge ${current_branch} -m "Merge branch $current_branch into $target_branch" # 将本地原分支合并到测试分支-不加评价
echo "操作成功，请查看是否存在冲突，并自行推送"
sleep 2                                 # 等待2秒