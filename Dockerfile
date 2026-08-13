FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY dist.zip /tmp/

RUN unzip /tmp/dist.zip \
    -d /usr/share/nginx/html \
    && rm /tmp/dist.zip

COPY nginx.conf \
    /etc/nginx/conf.d/default.conf 
EXPOSE 8080    

CMD ["nginx", "-g", "daemon off;"]
