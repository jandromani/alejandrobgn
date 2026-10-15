# V2.2 — Art direction and evidence gate · 14 October 2026

## Core positioning
**Human-led enterprise AI engineering.** A professional portfolio must first convince a hiring manager about delivery capability, scope, decision ownership and operational adoption. Independent interactive products then demonstrate craft.

## Information architecture (prioritized)
1. First navigation item: **Experience**, not a gallery.
2. Primary home CTA: **Experience & results**.
3. Enterprise case studies: measurable time-to-use, responsibilities, boundaries.
4. Each case: interactive engineering anatomy figure; fact vs illustrative motion clear.
5. Systems: full catalogue (existing Next.js components preserved).
6. Labs: original HTML projects with authentic browser captures, Pum Pum only as a project.
7. AI Co-Evolution: 184 historic records + 17 dated, documented additions through 14 October.

## Three editorial tests
- **The 8-second CTO test**: who is the engineer, what did the engineer personally lead, and what changed?
- **The evidence test**: a verified structural artifact is not functional parity; a team's adoption claim is not an independently audited percentage.
- **The confidentiality test**: sector-only customer descriptions, never personal contacts, internal code, names, screenshot IDs or account secrets.

## Experience details
**Cybersecurity:** August 2026, under four weeks. A two-person engineering nucleus, initial zero customer context, rapid collaboration with the client's team, APM and role-based copilot activation, agent-authored PR workflows, an adapted SDD kit, Cucumber/Gherkin and quality/Definition of Done gates. Adoption reported by the team, not an external audit; no invented PR counts, adoption denominator or savings.

**Banking:** Four-week PoC. The author's major contribution is conceiving a corpus-first, canonical, deterministic approach to modernization, tested in one module. Project aggregates include 168 human hours, 197 input views, 173 derived UI components (not 173 deployed microfrontends), 91 represented legacy functions (not 91 equivalently migrated functions), 66 proposed service operations, 22,995 source-linked evidence records and 4,338 file comparisons under a bounded reproducibility profile. Full migration, equivalence, commercial impact and runtime deployment not proven. **Disclose only counts cleared for public publication.**

## Visual direction
- Keep the original palette: ink navy, paper, signal green, system cyan.
- Use Anatomy-like **explanatory mechanisms** in the *conceptual style*, not a copied SVG: SVG with moving components, stateful station selection, human-operable controls, keyboard focus and reduced-motion support.
- The two illustrated machines should teach a real process; geometry is editorial, not a simulated digital twin of customer infrastructure.
- Do not add more decorative dashboards or generated screenshots; original HTML screenshots are already present.
- Avoid full-width 3D in homepage hero; keep Pum Pum isolated in Labs.
- Preserve article and reference SEO, avoid superseding site routes.
- Mobile: select stations and inspect explanatory panel; do not rely on SVG fine-print for critical facts.

## Technical gate
- `node scripts/v2-validation.mjs`
- `pnpm typecheck`
- `pnpm build`
- Vercel preview: homepage, /experience, /enterprise, two case studies, /systems, /evolution, /labs.
- Test reduced motion, keyboard tab navigation, mobile width, text contrast.
- **No merge or production promotion without human approval.**

## Tool provenance
Inspired by the explanatory principle in the MIT-licensed Anatomy skill (wheresryan22/anatomy). The local JSX/SVG implementation is independently authored and introduces no runtime package, API token or vendored third-party source.


## Anatomy V3 · mechanical second visual gate (14 Oct)

Two substantially different six-station isometric machines are implemented in `components/anatomy-machine-v3.tsx`:
- **Agentic delivery engine:** business intake hopper → knowledge vessel → 4-role copilot cartridge array → PR forging press → SDD/DoD interlocks → enablement console.
- **Deterministic modernization factory:** legacy source rack → representative slice clamp → canonical graph chamber → 3-head generator mill → dual-run comparator → evidence register/printer.

Interaction: accessible HTML station buttons and keyboard-selectable SVG machines; assembly, exploded and signal-path views; pause/replay motion; readable mechanism-by-mechanism technical descriptions, inputs, outputs, metrics and evidence boundaries. Mobile viewers can horizontally scroll the apparatus and use station buttons below. Motion responds to `prefers-reduced-motion`.

**Illustration vs technology truth:** the mechanism is an editorial physical metaphor for the process; its moving parts are not a source-level reconstruction or real client telemetry. No percentages, gear ratios or engineering dimensions are fabricated. Distinct scopes of proof remain visible per station.

**Upstream inspiration:** <https://github.com/wheresryan22/anatomy> MIT-licensed conceptual technique and craft principles; no upstream source files or assets are copied or bundled into the site.
