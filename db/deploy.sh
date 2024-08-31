#!/bin/bash -e
DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

bun drizzle-kit migrate

for file in db/functions/*.sql db/security.sql
do
  echo "Running $file..."
  psql --dbname "$DB_URL" < "$file"
done

bun generate-types