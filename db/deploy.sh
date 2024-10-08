#!/bin/bash -e
DEFAULT_DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
export DB_URL="${DB_URL:-$DEFAULT_DB_URL}"

bun drizzle-kit migrate

for file in db/functions/*.sql db/security.sql
do
  echo "Running $file..."
  psql --dbname "$DB_URL" < "$file"
done

if [ -z "$CI" ]; then
  if [ "$DB_URL" = "$DEFAULT_DB_URL" ]; then
    bun generate-types
  else
    echo "Skipping generating types as not running against local"
  fi
else
  echo "Skipping generating types as running on CI"
fi