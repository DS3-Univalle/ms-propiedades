FROM node:14
WORKDIR /Backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]

