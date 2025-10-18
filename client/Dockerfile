# Client Dockerfile (Node 16)
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
