FROM registry.kinson.fun/node:20-alpine as builder
WORKDIR /benxiao-console
COPY . .
RUN npm config set registry https://jfrog.kinson.fun/artifactory/api/npm/npm-ali/
RUN yarn install --network-timeout=300000
EXPOSE 8080
ENTRYPOINT ["npm", "run", "prod"]
