FROM node:lts-alpine as builder

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./
COPY tsoa.json ./
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start" ]
