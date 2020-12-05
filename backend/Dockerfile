FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./server.js .

EXPOSE 9001

CMD [ "node", "server.js" ]
