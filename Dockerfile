FROM node:12.18.1 as api
WORKDIR /usr/src
COPY package*.json .
COPY tsconfig*.json .
COPY nest*.json .
#RUN npm install -g nodemon
RUN npm install
COPY ./src .
COPY ./env ./env
CMD npm run start

FROM fluent/fluent-bit:1.2 as fluentbit
ADD fluent-bit.conf /fluent-bit/etc/

FROM docker.elastic.co/apm/apm-server:7.14.0 as apm
COPY apm-server.yml /usr/share/apm-server/apm-server.yml
USER root
RUN chown root:apm-server /usr/share/apm-server/apm-server.yml
USER apm-server

FROM node:12.18.1 as ms_pagamento
WORKDIR /usr/src
COPY MicroServicos/pagamento/package*.json .
COPY MicroServicos/pagamento/tsconfig*.json .
COPY MicroServicos/pagamento/nest*.json .
#RUN npm install -g nodemon
RUN npm install
COPY ./MicroServicos/pagamento/src .
COPY ./MicroServicos/pagamento/env ./env
CMD npm run start