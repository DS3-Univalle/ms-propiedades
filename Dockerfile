FROM node:14
WORKDIR /Backend
COPY package*.json ./
RUN npm install
EXPOSE 3306
COPY index.js .
CMD ["npm", "start"]