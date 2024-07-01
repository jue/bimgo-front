#!/bin/bash

# 本地源目录
LOCAL_SRC_DIR="/www/wwwroot/bimgo/front/dist"

# 远程目标目录
REMOTE_DEST_DIR="root@47.116.193.226:/www/wwwroot/bimgo/front"

# 进入前端项目目录
cd /www/wwwroot/bimgo/front

# 构建前端项目
npm run build

# 同步并删除远程目录中不存在的文件
rsync -avzP --delete "$LOCAL_SRC_DIR" "$REMOTE_DEST_DIR"
