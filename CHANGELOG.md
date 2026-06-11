# Changelog

All notable changes to this project will be documented in this file.

## [v2.0.0] - 2026-06-11

### Overview

v2 is a full rewrite of the portfolio site. The entire stack was replaced — from build tooling and UI frameworks to data-fetching patterns and testing infrastructure — with the goal of improving developer experience, runtime performance, maintainability, and mobile usability.

---

### ⚙️ Build Tooling

| | v1 (main) | v2 |
|---|---|---|
| Bundler | Create React App (react-app-rewired) | **Vite** |
| Package Manager | yarn | **pnpm** |
| TypeScript | via CRA | `tsc -b` + Vite |
| Linter / Formatter | ESLint | **Biome** |

- Replaced Create React App with **Vite** for significantly faster HMR and cold start
- Migrated from **yarn** to **pnpm** for faster installs and strict dependency isolation
- Replaced ESLint + Prettier with **Biome** (single tool for lint + format)
- Added `pnpm-workspace.yaml` for workspace configuration

---

### 🎨 UI & Styling

| | v1 (main) | v2 |
|---|---|---|
| Component Library | Material UI (MUI) | **DaisyUI** |
| CSS Framework | @emotion/styled | **Tailwind CSS v4** |
| Theme System | MUI ThemeProvider | DaisyUI data-theme + CSS variables |
| Icon System | MUI Icons / custom SVG `.tsx` | **SVGR** (`.svg?react`) |

- Replaced **Material UI** with **Tailwind CSS v4 + DaisyUI** — drastically reduced bundle size and removed `@emotion/*` dependency
- Replaced inline SVG components with **SVGR** — SVGs are imported as React components via Vite plugin
- Introduced **dark/light theme toggle** with `localStorage` persistence
- Added `styled-components` for dynamic GitHub-flavored UI components (`GithubButton`, `GithubTab`, `GithubChip`, etc.)

---

### 🏗️ Architecture

| | v1 (main) | v2 |
|---|---|---|
| Routing | react-router-dom (v5-style) | **react-router v7** (createBrowserRouter) |
| Data Fetching | Custom hooks with `useEffect` | **React Router Loaders** + Suspense/Await |
| Loading State | Custom loading flags in hooks | **Skeleton components** per page |
| API Cache | None | **SHA1-keyed cache with TTL** (`setTimeout` auto-delete) |
| API Throttling | None | **@octokit/plugin-throttling** |
| Directory Structure | `src/pages/`, `src/components/` (flat) | `src/components/{common,features,ui}/` |
| Env Vars | Scattered `process.env` references | **Centralized `ENV` module** (`src/constants/env.ts`) with startup validation |
| SVG Assets | `src/assets/svgs/*.tsx` | `src/components/icons/*.svg` (SVGR) |

Key architecture changes:

- **Loader pattern**: Data is pre-fetched before rendering via React Router loader functions. Each feature page (`repository`, `skill`, `tree`) has a dedicated `loader.ts` and `skeleton.tsx`.
- **Suspense/Await**: All async data rendering uses `<Suspense>` + `<Await>` instead of conditional render guards, enabling streaming-friendly code structure.
- **TTL cache**: Octokit GET responses are cached in-memory by SHA1 hash of the request. `setTimeout` auto-deletes entries after `VITE_CACHE_TTL_MS` milliseconds, preventing both stale data and memory accumulation.
- **Component hierarchy**: Components reorganized into `common/` (reusable), `features/` (page-level), and `ui/` (design system / GitHub UI reproductions).

---

### ✨ Added Features

- **Internationalization (i18n)**: Full EN / JA translation support via **Lingui** (`@lingui/react`). Language preference is persisted in `localStorage`.
- **Storybook**: All components have `index.stories.tsx` with interaction tests via `@storybook/addon-vitest` + Playwright (Chromium).
- **Go-to-file search**: Fuzzy search across repository file tree, accessible from the repository page.
- **Skill visualization**: Skill sidebar replaced with an interactive **Highcharts** chart (proportion bar + legend per skill group).
- **Breadcrumbs navigation**: File path breadcrumbs on the tree page via the new `Breadcrumbs` component.
- **Loading skeletons**: Each page and data-dependent component has a dedicated skeleton to eliminate layout shift during data fetch.
- **Rate limit error handling**: Detects GitHub API 401 (unauthorized) — clears access token and fires `octokit:unauthorized` event. Rate limit errors surface dedicated error UI.
- **Abort signal propagation**: Loader `request.signal` is forwarded to Octokit calls, cancelling in-flight requests on navigation.
- **Mobile responsive design**: Full mobile layout overhaul including:
  - Responsive grid layouts (repository page, profile header)
  - Mobile three-dot menu (▾) in header for login/logout, language, and theme controls
  - Horizontal scrolling for tabs, code blocks, and tables on small screens
  - `Container` component gains `px-4 md:px-6` padding globally
- **Easter egg (Cow Powers)**: `/cow` page retained and wired into the new router.

---

### 🗑️ Removed Features

- **Discussion UI**: The entire `src/components/ui/discussion/` subtree (15+ components) was removed. This was a GitHub Discussions viewer that is no longer part of the portfolio scope.
- **C3 chart**: `c3` and `@types/c3` dependency removed. Skill visualization migrated to Highcharts.
- **Google Maps link**: `LinkGoogleMap` component removed.
- **Language sidebar**: `LanguageSidebars` (MUI progress bars per language) replaced by the new `SkillSidebarComponent` using Highcharts proportion bars.
- **Static JSON data**: `src/data/{profile,experience,skills,cow}.json` removed. Profile and experience data are now fetched from the GitHub API at runtime.
- **Mock data**: `src/mockData/` directory (mock JSON fixtures for Jest tests) removed along with the Jest test suite.
- **`src/pages/` directory**: Page-level components moved to `src/components/features/`.
- **`generate.mjs`**: One-off code generation script removed.
- **`process` polyfills**: `buffer`, `path-browserify`, `process`, `stream-browserify` removed (no longer needed with Vite).
- **`react-app-rewired` / CRA config**: All webpack override config removed.

---

### 🧪 Testing

| | v1 (main) | v2 |
|---|---|---|
| Test Runner | Jest (via CRA) | **Vitest** |
| Test Files | `.jsx` with `@testing-library/react` | `.stories.tsx` via `@storybook/addon-vitest` |
| Browser Tests | None | **Playwright** (Chromium) |
| A11y Tests | None | `@storybook/addon-a11y` |

- Migrated from Jest to **Vitest** with happy-dom environment
- All component tests are written as **Storybook stories** with `play` functions
- Browser-based interaction tests run via Playwright through the Storybook test addon

---

### 📦 Dependency Changes

#### Added

| Package | Purpose |
|---|---|
| `@lingui/core`, `@lingui/react`, `@lingui/cli` | i18n |
| `@octokit/plugin-throttling`, `@octokit/types`, `@octokit/openapi-types` | GitHub API |
| `@tailwindcss/vite`, `tailwindcss`, `daisyui` | UI styling |
| `styled-components` | GitHub-style component theming |
| `dayjs` | Date formatting (replaces `moment`) |
| `dompurify` | Sanitize markdown HTML output |
| `highcharts` | Skill chart visualization |
| `vite`, `@vitejs/plugin-react`, `vite-plugin-svgr`, `vite-tsconfig-paths` | Build tooling |
| `@biomejs/biome` | Lint + format |
| `vitest`, `@storybook/*`, `playwright` | Testing |

#### Removed

| Package | Reason |
|---|---|
| `@mui/material`, `@emotion/react`, `@emotion/styled` | Replaced by Tailwind + DaisyUI |
| `@mui/icons-material` | Replaced by SVGR icon files |
| `react-scripts`, `react-app-rewired` | Replaced by Vite |
| `c3`, `@types/c3` | Replaced by Highcharts |
| `moment` | Replaced by dayjs |
| `crypto-js` | No longer needed |
| `buffer`, `process`, `stream-browserify`, `path-browserify` | Node polyfills not needed in Vite |
| `@types/jest`, `@testing-library/jest-dom` | Replaced by Vitest |
| `gh-pages`, `yargs` | Deploy tooling removed |

---

### 🔧 Environment Variables

The following env vars are now centrally managed via `src/constants/env.ts` (`ENV` constant) with startup-time validation:

| Variable | Description |
|---|---|
| `VITE_GITHUB_API_CLIENT_ID` | GitHub OAuth App client ID |
| `VITE_GITHUB_API_REDIRECT_URI` | OAuth callback URL |
| `VITE_GITHUB_API_SCOPE` | OAuth scope |
| `VITE_API_ENDPOINT` | Backend endpoint |
| `VITE_REPOSITORY_OWNER` | Target repository owner (replaces hardcoded value) |
| `VITE_REPOSITORY_NAME` | Target repository name (replaces hardcoded value) |
| `VITE_CACHE_TTL_MS` | Octokit response cache TTL in milliseconds |

---

[v2.0.0]: https://github.com/hunyao/Jun-Kumokawa/compare/main...feature/v2
