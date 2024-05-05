FROM node:latest

WORKDIR /user/src/app

COPY packages/package*.json ./

RUN npm install

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "dev"]