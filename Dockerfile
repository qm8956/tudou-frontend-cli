FROM nginx

COPY dist /usr/src/app
COPY nginx.conf /etc/nginx/nginx.conf