#!/bin/bash -e
DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

for file in supabase/migrations/*_fn_*.sql
do
  echo "Running $file..."
  psql --dbname "$DB_URL" < "$file"
done