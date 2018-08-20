FROM node:8-slim

RUN mkdir /app
WORKDIR /app
COPY . /app

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

CMD ["yarn", "start"]

