#!/bin/sh
set -e

echo "🚀 Starting application..."

# Run migrations if enabled
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    echo "📊 Running database migrations..."
    
    # Wait for database if URL provided
    if [ -n "$DATABASE_URL" ]; then
        echo "⏳ Waiting for database..."
    fi
    
    # Execute migrations
    if npx tsx lib/db/migrate.ts; then
        echo "✅ Migrations completed"
    else
        echo "❌ Migrations failed!"
        exit 1
    fi
else
    echo "⏭️ Skipping migrations (RUN_MIGRATIONS=false)"
fi

echo "🎯 Starting Next.js server..."
exec npm start