FROM node:8

RUN mkdir /app
WORKDIR /app
COPY . /app

ENV NODE_ENV dev
ENV NODE_PATH /app/node_modules
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install 

CMD ["npm", "start"]
