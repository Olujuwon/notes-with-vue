FROM node:lts-alpine

RUN npm i -g serve

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN ls -la

ENV VITE_APP_BACKEND_HOST=https://note-rest-api-5e74ajfmaa-ew.a.run.app/api/v1/
ENV VITE_NODE_ENV=test
ENV VITE_COOKIE_AGE=86400

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]