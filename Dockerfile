FROM registry.cn-hangzhou.aliyuncs.com/wonlycloud/nginx:1.27-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY dist.zip /tmp/
RUN unzip /tmp/dist.zip \
    -d /usr/share/nginx/ \
    && rm /tmp/dist.zip \
    && mv /usr/share/nginx/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 8080    

CMD ["nginx", "-g", "daemon off;"]