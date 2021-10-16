# escape=`

# client build

FROM node:14 as dep

ENV NODE_ENV=production 

WORKDIR /app

COPY package*.json .

RUN npm install

FROM node:14 as serve

ENV NODE_ENV=production 

WORKDIR /app

COPY --from=dep /app/node_modules /node_modules

COPY . .

RUN npm install -g @angular/cli@8.0.4

EXPOSE 4200

CMD ["ng", "serve"]
