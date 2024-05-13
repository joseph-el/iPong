FROM node:latest



WORKDIR /app

COPY packages/package*.json ./

RUN npm install

COPY . ./


CMD ["npm", "run", "dev"]