FROM node:18

WORKDIR /usr/src/app

COPY . ./

RUN yarn

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=3000

RUN yarn build

CMD [ "yarn", "preview", "--host", "0.0.0.0", "--port", "3000" ]
