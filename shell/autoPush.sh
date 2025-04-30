#!/bin/bash
 random_number=$RANDOM

# cd /d/power/SpringLoach.github.io
cd /d/工作相关/项目/练手/SpringLoach.github.io

git add .
git commit -m ${random_number}

echo "==========================拉取代码=========================="
# 执行git pull直至成功
while true; do
    # 尝试执行git pull
    echo "尝试执行git pull..."
    git pull

    # 检查git pull的退出状态
    if [ $? -eq 0 ]; then
        echo "git pull 成功"
        break
    else
        echo "git pull 失败，即将重试..."
        sleep 1  # 等待1秒后重试
    fi
done

# 执行git push直至成功
echo "==========================拉取代码成功，开始推送代码=========================="
while true; do
    # 尝试执行git push
    echo "尝试执行git push..."
    git push

    # 检查git push的退出状态
    if [ $? -eq 0 ]; then
        echo "git push 成功"
        break
    else
        echo "git push 失败，即将重试..."
        sleep 1  # 等待1秒后重试
    fi
done

echo "==========================结束=========================="
# read -p "输入任意字符以退出：" input