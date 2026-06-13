# Stage 1: Build Angular app
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@11.17.0
RUN npm install --omit=optional



COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist/immo-horizon-frontend/browser /usr/share/nginx/html

EXPOSE 80