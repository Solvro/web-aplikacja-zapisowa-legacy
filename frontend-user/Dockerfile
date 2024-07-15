FROM node:10.0.0

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . /app
COPY ./package.json /app/package.json
RUN npm install --legacy-peer-deps

CMD ["yarn", "start"]
