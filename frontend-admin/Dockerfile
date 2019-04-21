FROM node:8

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
COPY ./package.json /app/package.json
RUN yarn install --silent

CMD ["yarn", "start"]
