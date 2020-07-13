FROM node:10.21.0-alpine3.11
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]