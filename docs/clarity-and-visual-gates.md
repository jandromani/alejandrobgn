# F1/F2 — Executive clarity, design QA and interpretation

## Status and ownership
- Source implementation tests (headings, CTA, early metrics, contrast tokens and browser smoke) are automated.
- **The 5-second and 30-second comprehension gates are human evaluations, not Lighthouse scores and not inferred from CI.**
- No client data are exposed; all numeric enterprise claims retain team-reported measurement boundaries.

## Five-second test (n=5 participants unfamiliar with the work)
Show only the desktop or mobile first screen for exactly 5 seconds. Hide it.
Ask, without prompting:
1. What sort of professional is this?
2. What does this person help a team accomplish?
3. What would you click to see evidence?

Pass if at least 4 of 5 independently describe enterprise AI engineering leadership and can identify the Work/evidence route; record verbatim responses.

## Thirty-second test
Let participants browse for 30 seconds.
Ask for two specific outcomes, the distinction between team-reported process outcomes and customer financial outcomes, and how they would contact the author.
Pass if at least 4/5 name a scoped AI-activation result, a modernization outcome, and identify the limits on the data.

## Visual review checklist
- Compare full-page screenshots for widths 320, 390, 768, 1024, 1440 and 1920.
- Check light/dark themes; no clipped cards, 200% zoom, 400% zoom, focus, touch, reduced-motion support.
- Inspect hero and first result prominence, whitespace balance, paragraph measures, card image legibility, links, footer, detailed sections.
- Validate text/background contrast (normal text 4.5:1, large 3:1) with a computed-styles audit tool; representative token checks alone do not certify WCAG AA.
- Include axe-core and manual keyboard-only navigation as separate checks before declaring accessible.
- Preserve client anonymity and don't equate source-coded diagrams to real customer traces.

## Evidence and release
- `/work` leads to the two selected enterprise cases; their early measurements reference scoped delivery-team outcomes.
- Hero operating diagram is conceptual, with links to the public case explanations.
- `/release-info` returns a commit identifier when Vercel provides it; return null if unavailable, never invent one.
- Capture final production URLs and build SHAs only after Vercel reports READY and the alias is verified.
- Passing local Chromium tests does not prove that the latest source is published.
