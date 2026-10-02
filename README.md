# Printfloor

Tracks 3D-print orders and their cash/barter settlement: items, categories,
installments, delivered vs. total value, and shareable order links.

Built with Next.js 16 (App Router) + TypeScript + Tailwind v4, persisted to a
Turso (libSQL) database.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). With no environment
variables set, the app falls back to a local SQLite file at `./local.db`
(gitignored) — no Turso account needed for local work.

## Environment variables

| Variable             | Required in         | Notes                                              |
| --------------------- | -------------------- | --------------------------------------------------- |
| `TURSO_DATABASE_URL`  | staging / production | libSQL connection URL for the Turso database        |
| `TURSO_AUTH_TOKEN`    | staging / production | auth token for that database                        |

See `.env.example`. Set these per-environment (Production/Preview) in the
Vercel project settings — never commit real values.

## Testing

```bash
npm run lint
npm run test
```

Both run in CI (`.github/workflows/ci.yml`, alongside `npm run build`) on
every pull request and on push to `main`.

## Deploy

The project is deployed on Vercel, connected to this GitHub repo. Merging to
`main` (after the CI checks above pass) triggers a production deploy
automatically.
