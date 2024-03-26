FROM node:20-alpine

WORKDIR .

COPY package.json .
COPY package-lock.json .

RUN npm cache clear --force
RUN npm install --verbose express

COPY . .

EXPOSE 3000

CMD ["npm", "start"]