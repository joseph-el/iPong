FROM node:22

WORKDIR /app

RUN npm install -g prisma --unsafe-perm

ADD ./ ./prisma/

CMD ["prisma", "migrate", "deploy", "--preview-feature"]