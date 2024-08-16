#!/bin/bash

echo "请选择你要合并到测试分支的项目:"

source d:/power/SpringLoach.github.io/shell/common_path.sh

echo "默认分支为${target_test_branch}，是否合并到该分支？"
read -p "输入y或n：" answer

if [ $answer != 'y' ]
then
    read -p "输入需要合并到的测试分支：" target_test_branch
fi

current_branch=$(git branch --show-current)

#Push local branch to test branch
git checkout .				               # 丢弃本地修改
# 有待完善，如果没有关联过远程分支，应该先关联推送
git push                             # 推送当前分支到远端
git switch ${target_test_branch}     # 切换到测试分支


# 切换后的分支
switch_branch=$(git branch --show-current)
# 比较当前分支名是否为目标分支名
if [ "$switch_branch" = "$target_test_branch" ]; then
    echo "当前分支是 $target_test_branch"
else
    echo "检测到当前分支不是 $target_test_branch，将不会执行后续操作"
    read -p "........"
    exit
fi

git pull                                # 从远程拉取最新代码到本地
echo "当前需要合并的分支: ${current_branch}"
git merge ${current_branch} --no-edit   # 将本地原分支合并到测试分支-不加评价

# 检查是否存在冲突
if git diff --quiet --cached; then
  echo "没有冲突, 自动执行 git push"
  git push
else
  echo "存在冲突，需自行手动解决"
fi

sleep 2                                 # 等待2秒