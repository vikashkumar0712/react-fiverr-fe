# Build stage
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.21.3-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
