# escape=`

FROM node:latest as dep

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json .

RUN npm install

FROM node:latest

COPY --from=dep /app/node_modules /node_modules

COPY . .

EXPOSE 3003

CMD ["node", "server.js"]