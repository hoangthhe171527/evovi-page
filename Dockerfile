FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV TANSTACK_START_NODE_DEPLOY=1
RUN npm run build
RUN npm prune --omit=dev

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
CMD ["npm", "start"]
