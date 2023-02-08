
FROM node:14.17.0 as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000

COPY /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY /frontend/front/build  /usr/share/nginx/htmlg
