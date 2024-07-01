FROM node:latest

WORKDIR /app

RUN npm install -g prisma --unsafe-perm

ADD ./ ./prisma/

COPY wait-for-it.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["wait-for-it.sh", "database:5432", "--", "prisma", "migrate", "deploy"]