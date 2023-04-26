FROM node:latest

WORKDIR /usr/src

COPY . .
COPY ./.env.development ./env

RUN npm i --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

CMD ["npm", "run", "start:prod"]