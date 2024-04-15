#!/bin/bash

target_branch=test_11.2
current_branch=$(git branch --show-current)
#Push local branch to test branch
if [ true ]
then
	git checkout .				           # 丢弃本地修改
	git switch ${target_branch}            # 切换到测试分支
	git pull                               # 从远程拉取最新代码到本地
	git merge ${current_branch} --no-edit  # 将本地原分支合并到测试分支-不加评价
    echo "操作成功，请查看是否存在冲突，并自行推送"
else
	echo "sorry, program operation requires specifying parameters"
fi