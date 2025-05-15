#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready at db:5432..."

until nc -z db 5432; do
  echo "Waiting for database..."
  sleep 1
done

echo "✅ PostgreSQL is up - running migrations..."
pnpm prisma migrate deploy

echo "🚀 Starting Next.js app..."
pnpm run dev
