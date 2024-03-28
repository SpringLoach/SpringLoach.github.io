#!/bin/bash
 random_number=$RANDOM

git add .
git commit -m ${random_number}

# 执行git push直至成功
echo "启动"
while true; do
    # 尝试执行git push
    git push

    # 检查git push的退出状态
    if [ $? -eq 0 ]; then
        echo "Git push 成功"
        break
    else
        echo "Git push 失败，稍后重试..."
        sleep 5  # 等待5秒后重试
    fi
done

echo "结束"
read -p "输入任意字符以退出：" input