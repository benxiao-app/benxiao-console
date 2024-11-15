FROM registry.kinson.fun/node:20-alpine as builder
WORKDIR /benxiao-console
ENV NODE_ENV=production
COPY . .
RUN npm config set registry https://jfrog.kinson.fun/artifactory/api/npm/npm-ali/
RUN yarn install
EXPOSE 8080
ENTRYPOINT ["npm", "run", "prod"]
