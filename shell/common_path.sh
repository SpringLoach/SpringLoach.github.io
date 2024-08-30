# 作为合并对象的测试分支
target_test_branch=test_11.9

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

select opt in "自定义路径" "erp-admin" "lbdj-pc-website" "lbdj-app-h5" "lbdj-team-app-h5" "lbdj-order-app-h5" "lbdj-wap" "worker-mini-program" "xd-mini-program" "official-website-pc-fe" "xixiang-virtual-street-h5" "jms-erp-fe" "jms-jd-pc-fe" "lbdj-performance-web" "jingjiangbang-manage-pc" "lb-oa-frontend" "退出"; do
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
      path='d:\项目\xd-mini-program'
      break
      ;;
    "official-website-pc-fe")
      path='d:\项目\official-website-pc-fe'
      break
      ;;
    "xixiang-virtual-street-h5")
      path='d:\备用项目\xixiang-virtual-street-h5'
      break
      ;;
    "jms-erp-fe")
      path='d:\项目\jms-erp-fe'
      break
      ;;
    "jms-jd-pc-fe")
      path='d:\项目\jms-jd-pc-fe'
      break
      ;;
    "lbdj-performance-web")
      path='d:\项目\lbdj-performance-web'
      break
      ;;
    "jingjiangbang-manage-pc")
      path='d:\项目\jingjiangbang-manage-pc'
      break
      ;;
    "lb-oa-frontend")
      path='d:\项目\lb-oa-frontend'
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