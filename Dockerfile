FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
