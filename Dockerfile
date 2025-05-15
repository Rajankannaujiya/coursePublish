FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

COPY wait-for-db.sh .
RUN chmod +x ./wait-for-db.sh


RUN ls -la ./prisma/schema.prisma
RUN pnpm prisma generate --schema=./prisma/schema.prisma


EXPOSE 3000

CMD ["pnpm", "run", "dev"]
