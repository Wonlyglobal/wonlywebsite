# WONLY CMS 自托管 GitHub Runner 首次接入指令

## 项目目的

本次工作的目的，是在WONLY自有服务器上正式安装并持续运行CMS所需的服务端能力，使已经完成的后台功能能够连接真实服务，而不是继续显示“待配置”、模拟状态或仅保存数据库任务。

完成后应实现：

1. 启用七个固定CMS API：管理员邀请、GA4/GSC数据同步、第三方集成健康检查、数据库备份恢复、DeepSeek公开页面处理、页面质量检查和受审批发布执行。
2. 启用两个后台任务：到期内容自动发布，以及Webhook可靠投递与失败重试。
3. 由Nginx在`https://cms.wonlyglobal.com/api/`下提供固定HTTPS入口，所有Node服务只监听服务器本机，不直接暴露端口。
4. 建立可审计的持续交付链路：经审核的代码合并到`main`后，由专属GitHub Runner等待生产审批，再自动安装、检查、启用和记录准确版本。
5. 将业务密钥与代码彻底分离：Supabase service-role、Google、DeepSeek、数据库和Webhook密钥只保存在服务器，不能进入GitHub、浏览器构建、CMS数据表或日志。
6. 保证发布可控：拒绝任意分支和被修改的工作区，Nginx检查失败不重载，服务安装失败自动回切上一版本。

本任务不负责替换官网静态页面部署，也不自动合并代码、创建第三方账号或生成缺失密钥。首次接入完成后，仍需CMS超级管理员逐项执行真实业务验收，只有取得脱敏回执后才能认定九项服务正式可用。

## 目标与安全边界

此方案让运维只做一次服务器接入，后续由 GitHub Actions 部署七个 CMS API、定时发布任务和 Webhook worker。工作流只接受已经进入 `main` 的完整 40 位提交 SHA，并受 GitHub `cms-production` Environment 审批保护。

Runner 不保存业务密钥。Supabase service-role、Google、DeepSeek、数据库与 Webhook 密钥只放在服务器 `/etc/wonly-cms/*.env`。不要把环境文件内容粘贴到工单、聊天、Actions Secret 或构建日志。

## 一、GitHub 管理员配置

1. 在仓库 **Settings → Environments** 新建 `cms-production`。
2. 开启 **Required reviewers**，至少指定一名非提交者；禁止管理员绕过审批（如组织策略允许）。
3. 在 **Settings → Actions → Runners → New self-hosted runner** 新增 Linux x64 Runner。
4. 给 Runner 增加唯一标签 `wonly-cms-production`，不要让其他仓库共享该 Runner。
5. Runner 组仅授权 `Wonlyglobal/wonlywebsite`，关闭 public fork 工作流访问。

## 二、服务器首次准备（由运维执行）

以下命令中的 Runner 下载地址和一次性注册令牌必须使用 GitHub 页面当时生成的值，不要从文档复制旧令牌。

```bash
sudo useradd --system --create-home --shell /bin/bash github-cms-runner
sudo install -d -o github-cms-runner -g github-cms-runner -m 0750 /opt/actions-runner
sudo -u github-cms-runner bash
cd /opt/actions-runner
# 在这里执行 GitHub “New self-hosted runner” 页面提供的 curl、tar 和 ./config.sh 命令。
# config.sh 标签至少包含：self-hosted,linux,x64,wonly-cms-production
exit
cd /opt/actions-runner
sudo ./svc.sh install github-cms-runner
sudo ./svc.sh start
```

服务器必须预装 Node.js 22、npm、PostgreSQL client（`pg_dump`/`pg_restore`）、Nginx、curl、git、tar、sudo和systemd。运行 `node --version`、`pg_dump --version`、`nginx -t` 确认可用。

从审核后的 `main` 下载 `deployment/cms-services/install-cms-services`，人工核对 SHA 后安装为 root 只读文件：

```bash
sudo install -o root -g root -m 0755 install-cms-services /usr/local/sbin/install-wonly-cms-services
echo 'github-cms-runner ALL=(root) NOPASSWD: /usr/local/sbin/install-wonly-cms-services *' | sudo tee /etc/sudoers.d/wonly-cms-runner
sudo chmod 0440 /etc/sudoers.d/wonly-cms-runner
sudo visudo -cf /etc/sudoers.d/wonly-cms-runner
```

该 sudo 授权仅允许调用 root 持有的固定安装器。不要授予 Runner 通用 `sudo`、shell、systemctl、cp 或编辑 `/etc` 的权限。

## 三、创建服务器环境文件

根据 `deployment/cms-services/env.example` 分拆创建以下九个文件：

```text
/etc/wonly-cms/admin.env
/etc/wonly-cms/analytics.env
/etc/wonly-cms/health.env
/etc/wonly-cms/backup.env
/etc/wonly-cms/ai.env
/etc/wonly-cms/quality.env
/etc/wonly-cms/deploy.env
/etc/wonly-cms/publish-schedules.env
/etc/wonly-cms/webhook.env
```

所有文件设置 `root:wonly-cms`、`0640`。每个 API 文件只保留自身需要的变量。备份服务必须同时具备真实 staging 与 production 数据库连接；没有 staging 时不要启用恢复功能。部署服务的 `CMS_DEPLOY_TARGETS` 必须使用固定 provider URL，并显式填写 `health_origin`。

## 四、接入 Nginx

在 `cms.wonlyglobal.com` 的 HTTPS `server {}` 内加入且只加入一次：

```nginx
include /etc/nginx/snippets/wonly-cms-api.conf;
```

首次运行前可创建空的目标文件，使配置引用存在：

```bash
sudo install -o root -g root -m 0644 /dev/null /etc/nginx/snippets/wonly-cms-api.conf
sudo nginx -t
```

安装器会用仓库审查版本替换该 snippet，并在重载前再次执行 `nginx -t`。不要把 snippet 放到 `http {}` 根层级；七条 `location` 必须位于 CMS HTTPS server 内。

## 五、首次自动部署

1. 先将审查分支通过 Pull Request 合并到 `main`；工作流拒绝未进入 `main` 的提交。影响CMS服务的文件进入`main`后会自动创建一次待审批部署。
2. 自动任务未产生或需要重试时，打开 **Actions → Deploy CMS services to self-hosted server → Run workflow**。
3. `commit_sha` 填写合并后要部署的完整 40 位 SHA。
4. `confirmation` 填写 `DEPLOY-CMS-PRODUCTION`。
5. Required reviewer 审核 `cms-production` 环境后才会执行安装。

安装器自身还会通过 GitHub HTTPS 查询远端 `main`，只有输入 SHA 与远端当前 `main` 完全一致才继续；即使 Runner 被误用，也不能通过该 sudo 入口部署任意分支。成功标准：七个 `wonly-cms@*.service`、`wonly-cms-publish-schedules.timer`、`wonly-cms-webhook.service` 全部为 active，`nginx -t` 成功，且 `/var/lib/wonly-cms/deployed-revision` 等于输入提交。

## 六、部署后人工验收

运维只提交脱敏输出，不提交环境变量内容：

```bash
sudo systemctl --no-pager --full status 'wonly-cms@*.service' wonly-cms-publish-schedules.timer wonly-cms-webhook.service
sudo journalctl --since '15 minutes ago' -u 'wonly-cms@*' -u wonly-cms-webhook.service --no-pager
sudo nginx -t
curl -i -X OPTIONS https://cms.wonlyglobal.com/api/admin/admins/invite -H 'Origin: https://cms.wonlyglobal.com'
curl -i https://cms.wonlyglobal.com/api/health/integrations/check -H 'Origin: https://invalid.example'
```

最后由 CMS 超级管理员在后台分别执行一次管理员邀请、GA4/GSC同步、集成探测、staging备份、AI预览、页面质量检查和受审批发布，保留任务ID及脱敏回执。没有这些真实证据时不得把服务写成“全部验收通过”。

## 七、紧急停用

```bash
sudo systemctl disable --now 'wonly-cms@*.service' wonly-cms-publish-schedules.timer wonly-cms-webhook.service
```

安装失败时，固定安装器会把 `/opt/wonly-cms/current` 切回部署前版本并尝试重启旧服务；Nginx只有在配置检查成功后才会重载。
