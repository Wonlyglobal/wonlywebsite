FROM registry.cn-hangzhou.aliyuncs.com/wonlycloud/nginx:1.27-alpine

# 基础镜像已自带 nginx 用户，无需手动 adduser/addgroup
# 直接使用 USER 指令切换即可
USER nginx

RUN rm -rf /usr/share/nginx/html/*

COPY dist.zip /tmp/

RUN unzip /tmp/dist.zip \
    -d /usr/share/nginx/ \
    && rm /tmp/dist.zip \
    && mv /usr/share/nginx/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 8080    

CMD ["nginx", "-g", "daemon off;"]