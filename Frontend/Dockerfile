FROM node:18-buster as build
RUN corepack enable

WORKDIR /src
COPY ["Frontend/package.json", "Frontend/yarn.lock", "Frontend/.yarnrc.yml", "./"]
RUN yarn install --immutable

COPY ["Frontend", "./"]
RUN yarn build
RUN mkdir -p /app/dist && cp -R ./dist/. /app/dist


FROM nginx:stable-alpine as final

COPY --from=build /app/dist /usr/share/nginx/html   
COPY ["Frontend/nginx.conf", "/etc/nginx/conf.d/default.conf"]

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
