# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (eslint-config-next core-web-vitals + typescript)

There is no test suite configured.

## This is NOT the Next.js you know

This project uses Next.js **16.4.0**, which has breaking changes vs. training-data versions — APIs, conventions, and file structure may differ. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code**, and heed deprecation notices there.

## Architecture

Standard Next.js App Router scaffold (`app/` directory, React 19, TypeScript, Tailwind CSS v4):

- `app/layout.tsx` — root layout; loads Geist via `next/font`
- `app/page.tsx` — single page
- `app/globals.css` — Tailwind v4 entry, wired through the `@tailwindcss/turbopack` loader rule in `next.config.ts`

`next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `experimental.agentFeedback` — all Next 16 features; check the bundled docs before changing or relying on their behavior.
