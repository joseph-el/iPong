FROM node:22

WORKDIR /app

COPY . .

COPY setup.sh .
RUN chmod +x setup.sh
RUN npm install


CMD ["./setup.sh"]
