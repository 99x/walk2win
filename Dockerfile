FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app/client

RUN npm install && npm run build

WORKDIR /usr/src/app/server

RUN npm install

EXPOSE 3003

CMD ["npm", "run", "prod"]