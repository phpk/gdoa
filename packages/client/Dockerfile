FROM node:lts-alpine as builder
WORKDIR /godo-admin
# RUN npm set registry https://registry.npm.taobao.org
# cache step
COPY package.json /godo-admin/package.json
RUN npm install
# build
COPY ./ /godo-admin
RUN npm run build:prod

FROM nginx as production
RUN mkdir /web
COPY --from=builder /godo-admin/dist/ /web
COPY --from=builder /godo-admin/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
