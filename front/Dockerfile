FROM node:14.17.0 as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 3000

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./build  /usr/share/nginx/html
