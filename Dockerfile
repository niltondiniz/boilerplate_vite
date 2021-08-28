FROM node:12.18.1 as api
WORKDIR /usr/src
COPY package*.json .
COPY tsconfig*.json .
COPY nest*.json .
#RUN npm install -g nodemon
RUN npm install
COPY ./src .
CMD npm run start

FROM fluent/fluent-bit:1.2 as fluentbit
ADD fluent-bit.conf /fluent-bit/etc/