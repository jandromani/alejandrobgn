# F0 — Controlled release / Alejandro BGN

## Canonical and safety boundary

- The only public identity is `https://alejandrobgn.vercel.app/`.
- V2 project ID: `prj_SsUclMxgncoEh7VO3Nze2WgVvVgl` (`alejandrobgn-v2-review`). Never migrate content to another user-facing hostname.
- Old project ID: `prj_xIOe2PJ03BrcrLaE34UW8niaoUkw` (`v0-custom-react-prompts`). It still holds the **administrative** project-domain association at last check, even though the Alias serves V2.
- The alias was verified on V2 at deployment `dpl_4xxwVEPEfXoZb5ttChayWKGRYobE` (commit `51f15b80`). Never claim a later commit is live merely because GitHub Actions succeeded.
- Current deployment quota can return HTTP 402 (`api-deployments-free-per-day`). No retry storms. Build on a feature branch and merge once after all checks are green.

## Single promotion procedure

1. Verify that the intended GitHub commit and CI gates match (source, responsiveness, Anatomy, evidence).
2. Confirm Vercel team, V2 project, target production environment and status/availability of deployment quota.
3. Deploy the **exact approved SHA** once to V2. Avoid a development sequence of production pushes.
4. Confirm READY and associate only the domain `alejandrobgn.vercel.app` with the tested V2 deployment.
5. Confirm the alias mapping and GET `/release-info` SHA, HTTPS, /work, /atlas, /sitemap.xml and browser E2E.
6. Save verified deployment ID / commit / UTC time in the release ticket.

## Administrative domain consolidation

The old project still owns the domain in Settings → Domains. This is separate from the serving alias. **Do not delete, move or unassign the domain until the V2 destination has been checked and a rollback ID is recorded.** Transfer the existing domain from the old project to V2 using the authenticated Vercel domain management workflow; recheck ownership, alias and HTTPS immediately afterwards. If the connector lacks a removal/move action, complete the move in the Vercel UI by an authorized owner; no fabricated success.

## Rollback

- Known working V2 deployment before F0: `dpl_4xxwVEPEfXoZb5ttChayWKGRYobE` (commit `51f15b80`).
- If publication fails, reassign the canonical alias to this known READY deployment; verify alias and the GET `/release-info` output. For project-level rollback, use Vercel's deployment rollback capability only after verifying the same V2 project and target.
- A rollback changes serving state; do not assume that DNS/project-domain administration is rolled back.
- Never delete the old Vercel project as part of an automatic rollback.

## Explicit gates

- Source SHA matches production SHA.
- Canonical hostname is served by V2; the domain is administratively attached to V2.
- No unexpected redirects, second public identity or broken deep links.
- Source gate and real local Chromium interaction gate green on exact SHA.
- Browser smoke test against **public production** after deployment; local browser tests alone are insufficient.
