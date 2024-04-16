# Creatorsgarten Inventory

This project leverages [Remix SPA Mode](https://remix.run/docs/en/main/future/spa-mode) and the [Remix Vite Plugin](https://remix.run/docs/en/main/future/vite) to build your app as a Single-Page Application using [Client Data](https://remix.run/docs/en/main/guides/client-data) for all of your data loads and mutations.

## Development

There are 3 ways to develop:

1. **Mock Backend**: Develop with a mock backend. Data is not saved anywhere. This is good for quickly adjusting frontend components or when the backend is not ready yet.

2. **Local Supabase**: Develop with a local Supabase instance. This is good for developing with isolated data.

3. **Production Supabase**: Develop with a production Supabase instance. For when you want to troubleshoot production issues or want to work with actual production data.

```sh
# Install dependencies
bun install

# Start Supabase (only when you want to develop with local Supabase)
bun supabase start

# Get the URLs for the local Supabase instance
bun supabase status

# Start dev server
bun dev
```

- To develop with a mock backend, go to `http://mock.localhost:5173/`
- To develop with a local Supabase instance, go to `http://localhost:5173/`
- To develop with a production Supabase backend, go to `http://prod.localhost:5173/`

## Database migrations

During development, you can directly make changes to your **local** database schema using Supabase Studio, available at `http://127.0.0.1:54323`. However, when you want to apply these changes to your **production** database, you need to create a migration script. Thankfully, Supabase CLI provides a tool to generate these migration scripts.

```sh
# Generate TypeScript types for the database schema.
bun generate-types

# Diff schema changes to create a migration script.
# This command creates a temporary database, applies all the current migrations,
# and then compares the schema with the local database.
# Any differences are output as a migration script.
# See: https://supabase.com/docs/reference/cli/supabase-db-diff
bun supabase db diff -f MIGRATION_NAME

# Apply the migration script to the production database.
# See: https://supabase.com/docs/reference/cli/supabase-db-push
bun supabase db push
```

## Deployment

```sh
# Build app to `build/client`
bun run build
```
