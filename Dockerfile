FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV TANSTACK_START_NODE_DEPLOY=1
RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts

ENV PORT=80
EXPOSE 80
CMD ["npm", "run", "start"]