FROM node:lts as dependencies

WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:lts as builder
WORKDIR /app
ENV NODE_ENV production
ENV TZ=Asia/Tokyo
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build

FROM node:lts as runner

WORKDIR /app
ENV NODE_ENV production
ENV BASE_URL=http://localhost:8887
ENV NEXT_TELEMETRY_DISABLED 1
ENV TZ=Asia/Tokyo

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/*.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
