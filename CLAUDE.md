# Creatorsgarten Inventory - Agent Guidelines

## Commands

- Build: `pnpm build`
- Dev: `pnpm dev`
- Lint: `pnpm lint` (Biome)
- Format: `pnpm format`
- Typecheck: `pnpm typecheck`
- Tests: `npx playwright test`
- Single test: `npx playwright test tests/smoke.test.ts`

## Code Style

- Use 2 space indentation
- Prefer single quotes for strings
- Use semicolons as needed
- Format with Biome (`pnpm format`)
- Imports organized with Biome
- Use React 19 and TypeScript
- Path aliases: import from `~/packlets/*` for app modules

## Project Structure

- Remix-based app with packlets architecture
- Backend interfaces in `app/backend/`
- Reusable components in `app/packlets/`
- Use Chakra UI for components
- Supabase for authentication
- Custom backend API for database access
- Playwright for testing
