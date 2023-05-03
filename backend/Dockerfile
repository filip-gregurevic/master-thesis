FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

FROM node:1-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/yarn.lock ./yarn.lock
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:prod"]
