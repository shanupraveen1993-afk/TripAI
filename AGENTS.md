# Portfolio deployment — read before touching anything here

**Canonical portfolio site:** `Praveen/portfolio-site` (Next.js) → deploys to
**https://praveen-resume.vercel.app**, under the Vercel account `shanupraveen1993-2166`.

Do not deploy the portfolio to any other Vercel account or project. A prior
deploy from a different Vercel account produced a stale duplicate at
`praveen-uxd.vercel.app` / `praveen-uxd-sage.vercel.app` — that domain is not
maintained and should be ignored/decommissioned, not used as a reference or
deploy target.

Before deploying: `git push` any local commits first — this repo is the
source of truth, and deployments/tools reading from GitHub only see what's
been pushed.

`Praveen/demo` (the old TripAI Vite demo/scratch workspace) was removed —
see commit `ffbeb6e6`. It deployed separately to `tripai-thanjavur.vercel.app`
and is unrelated to the portfolio.
