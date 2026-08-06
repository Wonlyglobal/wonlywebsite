@echo off
chcp 65001 >nul
title WONLY 官网工作台
cd /d "D:\ai项目\wonly官网"

echo ==========================================================
echo   WONLY 海外官网 工作台   www.wonlyglobal.com
echo ==========================================================
echo.
echo [Git 状态]
git status -sb
echo.
echo [最近 5 次提交]
git log --oneline -5
echo.
echo [今日应上线文章 - 排期表见 docs/PROJECT-CONTEXT.md]
echo.
echo ----------------------------------------------------------
echo   常用命令速查:
echo.
echo   npm run dev          本地预览 (localhost:5173)
echo   npm run build        本地构建检查
echo   git pull --no-edit   拉取最新
echo   git add ^<文件^> ^&^& git commit -m "..." ^&^& git push
echo.
echo   项目全景/排期/机制说明:  docs\PROJECT-CONTEXT.md
echo   工作日志(日报数据源):    docs\worklog.md
echo   部署状态:  https://github.com/Wonlyglobal/wonlywebsite/actions
echo   GSC:       https://search.google.com/search-console
echo ----------------------------------------------------------
echo.
cmd /k
