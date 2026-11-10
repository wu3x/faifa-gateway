# Faifa community voting — Cloudflare D1 setup

The GitHub Pages frontend uses the existing Worker endpoint:
`https://faifa-gateway.a-alfaifi771.workers.dev/api/votes`.

## One-time Cloudflare setup
1. In Cloudflare Dashboard > Workers & Pages > D1, create database named `faifa-votes`.
2. Open its Console and execute the contents of `schema.sql` in this folder.
3. Open the **existing live Worker** that serves `faifa-gateway.a-alfaifi771.workers.dev`. Under Settings > Bindings, add a D1 Database binding named **VOTES_DB** and select `faifa-votes`.
4. Deploy the updated Worker code from `src/index.js` **together with** `src/votes.js` and the existing `src/knowledge` directory. Do not overwrite the live Worker with only `votes.js`. If deploying using Wrangler, ensure the Wrangler project targets the same live Worker, and add a D1 binding with `binding = "VOTES_DB"`, `database_name = "faifa-votes"`, and the real database ID returned by Cloudflare.
5. Verify GET `/api/votes?category=cafes` returns `{"counts":{}}` (or vote totals), not HTTP 503.

Voting uses a locally stored random browser ID; one current choice per browser per category, with the option to switch. No sign-in and no strong anti-abuse guarantees. Vote counts are shared through D1, not GitHub Pages. If the backend is unavailable, stars display but are disabled until the API responds.
