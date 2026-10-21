# F5 / Executive reader comprehension study

This is **not a completed user study**. Automated Chromium and axe checks cannot establish whether a human understands the portfolio. Do not assign a final 9/10 or state "accepted" until the sheet below has real observations.

## People and ethics
Recruit at least five people unfamiliar with the portfolio (ideally a hiring manager, engineering leader, technical architect and two cross-discipline readers). Do not expose confidential customer materials, collect personal secrets or imply external investors endorsed the portfolio.

## Five-second first-screen test
Show the homepage first viewport for exactly five seconds at the device size normally used by the participant. Hide it, then ask these open questions without hints:

- What kind of professional did you just see?
- What specific business or engineering problem could they help solve?
- Where would you click to find proof?

**Pass**: at least four out of five independently describe enterprise AI engineering leadership, a relevant technical outcome, and identify Work or a real enterprise case.

## Thirty-second exploration test
Allow 30 seconds of open navigation starting from the same homepage; ask:

- Which two examples of engineering work stood out?
- What does "89.9%" measure? Could it mean time or cost saved?
- Who reviews and approves agent-proposed changes?
- Can you find a contact route?

**Pass**: >=4/5 correctly describe workflow adoption and a scoped modernization PoC, distinguish process metrics from financial benefits, and find a professional contact.

## Reader scorecard (fill only with actual responses)

| Participant | 5s role | 5s proof route | 30s two outcomes | Metric scope understood | Contact discovered | Key confusion |
| --- | --- | --- | --- | --- | --- | --- |
| P1 | — | — | — | — | — | — |
| P2 | — | — | — | — | — | — |
| P3 | — | — | — | — | — | — |
| P4 | — | — | — | — | — | — |
| P5 | — | — | — | — | — | — |

## Acceptance thresholds
- >=4/5 per independent task above.
- Zero severe keyboard traps and zero high-severity unresolved axe findings across representative public paths.
- E2E gate passes on local Next.js build; separately verify the exact production SHA and full live URL before release acceptance.
- Any accessibility failures or user comprehension issues remain *open*, even if build and browser route checks pass.

## Evidence files
- CI artifact: `artifacts/portfolio-ui-qa/`, full screenshots at six widths, basic browser checks
- CI artifact: `artifacts/portfolio-integrity/route-inventory.json`, graph and canonical coverage
- CI artifact: `artifacts/portfolio-final-qa/scorecard.json`, interactive E2E, axe findings, synthetic browser metrics
- Lighthouse and real-user Core Web Vitals are **not equivalent** to local Chromium navigation timings; commission and record those separately.
