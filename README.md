# Guardian

## Overview
Guardian is the Foodin end-to-end automation workspace. The suite focuses on realistic user journeys to protect our critical flows across every Foodin surface. Phase one targets the Admin web application, and the same toolkit will extend to the customer, POS, and kiosk experiences.

## What You Get Today
- Admin smoke and regression coverage built with Playwright Test.
- Deterministic login bootstrap that captures reusable storage state.
- Data builders and schema validation to keep generated fixtures close to production.
- Page Object Models that hide selectors behind intention-revealing methods.

## Tech Stack & Conventions
- Playwright Test (TypeScript) orchestrates specs, retries, and artifacts.
- Zod schemas describe domain entities that power both builders and assertions.
- Faker and moment provide realistic data and date handling for dynamic tests.
- Biome + ESLint keep the codebase formatted and linted the same way everywhere.
- TypeScript path aliases (`@pages`, `@fixtures`, `@builders`, `@schemas`) centralise shared modules.

## Repository Layout
- `tests/apps/admin/` Feature-oriented spec files (auth, category, product, discount, addons).
- `pages/admin/` Page Object Models encapsulating UI actions and assertions.
- `fixtures/` Custom Playwright fixtures wiring page objects into tests.
- `builders/` Data factories that assemble valid payloads for the UI.
- `schemas/` Entities used in tests and builders.
- `setup/` Ancillary projects such as the admin authentication bootstrap.
- `storage/`, `test-results/` Runtime outputs (auth state, screenshots, videos, traces).
- `init_guardian.py` Helper script for downloading and installing desktop binaries when POS/Kiosk coverage is enabled.

## Getting Started
1. Install Node.js (18+) and your package manager of choice (`pnpm` is recommended; a `pnpm-lock.yaml` ships with the repo).
2. Install project dependencies: `pnpm install`.
3. (Optional) Install browser binaries once: `pnpm exec playwright install`.
4. Copy `.env` (or create one) and provide at least `ADMIN_URL`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`. Additional placeholders exist for customer, POS, kiosk, and API targets.

## Running Tests
- Execute the admin suite: `pnpm test:app:admin`.
- The Playwright `adminSetup` project runs first, performing a login and persisting `storage/admin-auth.json` so the main suite can reuse the session.
- Test evidence lives under `test-results/apps/admin/` and includes screenshots, videos, and traces.

## Extending Coverage
- Add new Page Objects under `pages/<target>/` to encapsulate interactions.
- Share fixtures that compose those page objects in `fixtures/` for ergonomic specs.
- Create builders and schemas for any new entity to generate safe data quickly.
- Register additional Playwright projects in `playwright.config.ts` as other applications (customer, POS, kiosk) come online.

## Helpful Commands
- `pnpm lint` Run Biome and ESLint.
- `pnpm format` Format with Biome.
- `pnpm check` Biome combined lint/format checks.

## Road Ahead
The backbone for multi-application coverage already exists. As new Foodin systems are onboarded, replicate the admin pattern: define the login bootstrap, model the pages, compose fixtures, and layer specs that reflect the business-critical journeys.
