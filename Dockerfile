FROM registry.cn-hangzhou.aliyuncs.com/wonlycloud/nginx:1.27-alpine

# 创建 nginx 用户和组
RUN addgroup -g 101 -S nginx \
    && adduser -S -D -H -u 101 -G nginx nginx

# 删除默认页面
RUN rm -rf /usr/share/nginx/html/*

# 拷贝前端包
COPY dist.zip /tmp/

# 解压
RUN unzip /tmp/dist.zip \
    -d /usr/share/nginx/ \
    && rm /tmp/dist.zip \
    && mv /usr/share/nginx/dist /usr/share/nginx/html

# 拷贝 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 修改目录权限
RUN chown -R nginx:nginx \
    /usr/share/nginx/html \
    /var/cache/nginx \
    /var/log/nginx \
    /etc/nginx \
    && mkdir -p /var/run \
    && chown -R nginx:nginx /var/run

# 使用普通用户运行
USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]