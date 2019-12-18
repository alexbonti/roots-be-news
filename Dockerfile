FROM node:10-alpine

# build tools for native dependencies

RUN apk add --update imagemagick

RUN apk add --update graphicsmagick

RUN apk add --update bash

WORKDIR /app/roots-news-backend
COPY . .

EXPOSE 8031

RUN cp .env.example .env

RUN PROJECT_FOLDER=lpad_news bash setup_upload.sh

RUN npm install

CMD ["npm","start"]
