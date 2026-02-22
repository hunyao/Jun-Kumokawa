# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website (GitHub-inspired design) for a full-stack engineer. Built with React + Vite + TypeScript, fetching GitHub data via the Octokit API with an OAuth flow.

## Commands

```bash
npm run dev         # Dev server on port 3000
npm run build       # tsc -b && vite build
npm run test        # Vitest with Storybook/Playwright browser testing
npm run lint        # Biome linter on src/
npm run storybook   # Storybook dev server on port 6006
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.ts
```

## Architecture

**Routing & Data Loading**: `src/routes.tsx` defines React Router routes with loader functions that pre-fetch GitHub data before rendering. Main routes: `/`, `/repo/:owner/:id`, `/tree/:owner/:id`.

**State Management**: Two React Contexts in `src/contexts/`:
- `ToastContext` — global toast notifications
- `ReposirotyContext` — repository data (note: typo in filename is intentional)

Each context uses a dual-pattern: separate read-context and setter-context exports.

**GitHub API**: `src/lib/octokit.ts` wraps Octokit with a SHA1-based in-memory cache for GET requests. OAuth token stored in localStorage via `src/hooks/useGithub.tsx`.

**Component Structure**:
- `src/components/features/` — feature-specific components (repository, tree, experience, skill, errors)
- `src/components/common/` — reusable UI primitives
- `src/components/ui/` — design system components
- `src/components/middlewares/` — HOC wrappers

**Content Rendering**: `src/lib/markdownIt.ts` renders Markdown with highlight.js syntax highlighting and emoji support.

## Path Aliases (tsconfig.app.json)

| Alias | Resolves to |
|---|---|
| `@features/*` | `src/components/features/*` |
| `@components/*` | `src/components/common/*` |
| `@ui/*` | `src/components/ui/*` |
| `@layouts/*` | `src/components/layouts/*` |
| `@middlewares/*` | `src/components/middlewares/*` |
| `@icons/*` | `src/components/icons/*` |
| `@hooks/*` | `src/hooks/*` |
| `@contexts/*` | `src/contexts/*` |
| `@utils/*` | `src/utils/*` |
| `@lib/*` | `src/lib/*` |
| `@constants/*` | `src/constants/*` |
| `@data/*` | `src/data/*` |

## Code Quality

**Biome** (`biome.json`) handles both linting and formatting — do not use Prettier or ESLint. Key rules:
- Single quotes, 2-space indentation
- Organized/sorted imports
- Sorted Tailwind CSS classes
- No unused variables or imports (enforced as errors)

Run `npm run lint` before committing to catch violations.

## Testing

Vitest with Playwright (Chromium) for browser-based component tests via Storybook. Stories live alongside components as `*.stories.tsx`. `src/utils/getAllCommitCounts.ts` is excluded from test runs (too expensive).

## Environment Variables

Required in `.env`:
```
VITE_GITHUB_API_CLIENT_ID=
VITE_GITHUB_API_REDIRECT_URI=
VITE_GITHUB_API_SCOPE=
```

The redirect URI points to an AWS Lambda function (via AWS SAM in `sam/`) that handles the GitHub OAuth callback.
