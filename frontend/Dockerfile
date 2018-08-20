FROM node:8-slim

RUN mkdir /app
WORKDIR /app
COPY . /app

ENV PATH /app/node_modules/.bin:$PATH
RUN rm -rf node_modules
RUN yarn install

CMD ["yarn", "start"]

