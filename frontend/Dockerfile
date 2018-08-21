FROM node:8

RUN mkdir /app
WORKDIR /app
COPY . /app

ENV NODE_PATH=/app/node_modules
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn install

CMD ["yarn", "start"]