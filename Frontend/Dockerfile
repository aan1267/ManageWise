# multi stage use here 
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_API_URI=/api
ENV VITE_API_URI=$VITE_API_URI

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.d
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

# npm run preview -- --host 0.0.0.0 --port 5173





