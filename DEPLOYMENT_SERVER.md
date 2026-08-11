# WONLY 官网部署交付说明

线上服务器由服务器管理方维护。本项目不会通过 SSH 连接线上服务器，也不需要服务器账号、密码或密钥。

## 构建与下载

1. 在 GitHub 仓库打开 **Actions**。
2. 运行 **Build production dist package**，或将代码合并到 `main` 自动触发。
3. 构建完成后，在该次运行的 **Artifacts** 中下载 `wonly-dist-<commit SHA>`。
4. 下载内容为 `dist.zip`，只包含最终静态网站文件，不包含源代码。

## 服务器部署

将 `dist.zip` 解压到网站根目录，例如 `/var/www/wonly/current`，然后让 Nginx 指向该目录。

SPA 路由必须配置回退：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

建议为带哈希的静态资源配置长期缓存，但不要长期缓存 HTML：

```nginx
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.html$ {
    add_header Cache-Control "no-cache";
}
```

部署完成后检查首页、产品深层链接、`robots.txt`、`sitemap.xml` 和 HTTPS。

## 回滚

服务器管理方应保留上一个 `dist.zip` 或上一版本目录。出现问题时，将网站目录切回上一版本并重载 Nginx。
