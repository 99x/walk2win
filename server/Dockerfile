# escape=`

FROM node:14 as dep

WORKDIR /app

COPY package*.json .

RUN npm install

FROM node:14 as prod

WORKDIR /app

COPY --from=dep app/node_modules node_modules

COPY . .

EXPOSE 3003

CMD ["node", "server.js"]
