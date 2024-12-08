FROM registry.kinson.fun/node:20-alpine as builder
WORKDIR /benxiao-console
COPY . .
RUN npm config set registry https://registry.npmmirror.com/
RUN yarn install
EXPOSE 8080
ENTRYPOINT ["npm", "run", "prod"]
