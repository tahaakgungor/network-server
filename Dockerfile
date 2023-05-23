FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt

COPY . .

EXPOSE 5001

CMD [ "npm", "start" ]
