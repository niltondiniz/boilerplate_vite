FROM node:12.18.1 as ms_pagamento
WORKDIR /usr/src
COPY package*.json .
COPY tsconfig*.json .
COPY nest*.json .
RUN npm install
COPY ./src .
COPY ./env ./env
CMD npm run start
