FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y mysql-client
EXPOSE 3000
COPY index.js .
CMD ["npm", "start"]