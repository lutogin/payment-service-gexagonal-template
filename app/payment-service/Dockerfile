FROM node:14-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install

#RUN npm install pm2 -g


FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000 9229

CMD yarn start:debug:tsc
