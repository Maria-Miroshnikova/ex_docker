FROM node:20-alpine AS builder

WORKDIR .

COPY package.json .
COPY package-lock.json .

RUN npm cache clear --force
RUN npm install --verbose express

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder ./build /usr/share/nginx/html
COPY --from=builder ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]