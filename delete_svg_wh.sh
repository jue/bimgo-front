#!/bin/bash

# 进入目标目录
cd src/assets/svg_icons

# 遍历所有 .svg 文件
for file in *.svg; do
  # 使用 sed 命令删除 width 和 height 属性
  sed -i '' 's/width="200px" height="200.00px"//g' "$file"
done

# 提示完成
echo "删除完成！"
