FROM node:18.7 AS builder
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:1.22.0

RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
