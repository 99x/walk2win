# escape=`

# client build

FROM node:latest as dep

ENV NODE_ENV=production 

WORKDIR /app

COPY package*.json .

RUN npm install

FROM node:latest as build

ENV NODE_ENV=production 

WORKDIR /app

COPY --from=dep /app/node_modules /node_modules

COPY . .

RUN npm run build

FROM node:latest

ENV NODE_ENV=production 

WORKDIR /app

COPY --from=build /app .

# default port of angular CLI
EXPOSE 4200

CMD ["npm", "start"]