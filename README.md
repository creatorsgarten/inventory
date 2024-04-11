# Creatorsgarten Inventory

This project leverages [Remix SPA Mode](https://remix.run/docs/en/main/future/spa-mode) and the [Remix Vite Plugin](https://remix.run/docs/en/main/future/vite) to build your app as a Single-Page Application using [Client Data](https://remix.run/docs/en/main/guides/client-data) for all of your data loads and mutations.

## Development

There are 3 ways to develop:

1. **Mock Backend**: Develop with a mock backend. Data is not saved anywhere. This is good for quickly adjusting frontend components or when the backend is not ready yet.

2. **Local Supabase**: Develop with a local Supabase instance. This is good for developing with isolated data.

3. **Production Supabase**: Develop with a production Supabase instance. For when you want to troubleshoot production issues or want to work with actual production data. (Unimplemented.)

```sh
# Install dependencies
bun install

# Start Supabase (only when you want to develop with local Supabase)
bun supabase start

# Start dev server
bun dev
```

- To develop with a mock backend, go to `http://mock.localhost:5173/`
- To develop with a local Supabase instance, go to `http://localhost:5173/`

## Deployment

```sh
# Build app to `build/client`
bun run build
```
