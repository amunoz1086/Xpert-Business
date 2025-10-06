FROM node:alpine3.17

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_HOSTNAME="0.0.0.0"
ENV PORT=3000

CMD ["node", "server.js"]