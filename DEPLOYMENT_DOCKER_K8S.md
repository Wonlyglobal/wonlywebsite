# WONLY 静态站 Docker / Kubernetes 交付说明

本镜像仅包含已构建的 `dist/` 静态站点和 Nginx，不包含源代码或 Node.js。容器监听 `8080` 端口，支持 SPA 深层链接回退到 `index.html`。

## 构建并推送镜像

在项目根目录（与 `Dockerfile` 同级）执行。将 `<registry>/<namespace>/wonly-web:<tag>` 替换为贵方镜像仓库地址、命名空间和版本号：

```bash
docker build -t <registry>/<namespace>/wonly-web:<tag> .
docker push <registry>/<namespace>/wonly-web:<tag>
```

如果服务器侧自行构建，请上传包含以下内容的压缩包后解压，再执行第一条命令：`dist/`、`Dockerfile`、`deployment/nginx.conf`、`.dockerignore`。

## Kubernetes 部署示例

将镜像地址替换为实际地址；私有仓库请按平台规范配置 `imagePullSecrets`。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wonly-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: wonly-web
  template:
    metadata:
      labels:
        app: wonly-web
    spec:
      containers:
        - name: wonly-web
          image: <registry>/<namespace>/wonly-web:<tag>
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /
              port: 8080
          livenessProbe:
            httpGet:
              path: /
              port: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: wonly-web
spec:
  selector:
    app: wonly-web
  ports:
    - port: 80
      targetPort: 8080
```

域名、TLS 证书和 Ingress 规则由贵方集群现有规范配置即可。部署后请检查首页、任一深层页面、`/robots.txt`、`/sitemap.xml` 和 HTTPS。
