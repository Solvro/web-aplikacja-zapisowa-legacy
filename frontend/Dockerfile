FROM node:8-slim

RUN mkdir /app
WORKDIR /app
COPY . /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

CMD ["npm", "start"]