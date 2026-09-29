# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

Next.js 16 (App Router, static export) + React 19 + TypeScript (strict) + Tailwind CSS v4 + Zustand + Recharts + next-themes. Jest (via `next/jest`) for tests.

Tailwind v4 has no `tailwind.config.js` — theme tokens (colors, skeuomorphic shadow variables) are defined via `@theme` and `:root`/`:root.dark` in `app/globals.css`.

## Commands

```bash
npm run dev              # dev server at localhost:3000
npm run build            # static export to out/ (next.config.ts sets output: "export")
npm run lint             # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npm test                 # run all Jest tests
npx jest path/to.test.ts # run a single test file
npx jest -t "name"       # run tests matching a name
npm run test:coverage    # tests with coverage report
npx tsc --noEmit         # typecheck (no dedicated npm script for this)
npx prettier --write .   # format; prettier-plugin-tailwindcss auto-sorts class names
```

Always run `npx tsc --noEmit`, `npm run lint`, and `npm test` after changes — there's no combined CI script to defer to locally.

## Architecture

- `app/page.tsx` is the only route; it renders the header and `<Calculator />`.
- `components/Calculator.tsx` owns all form state (`formData`) and derived results (`maturityValue`, `interestEarned`, `growthSeriesData`) as local `useState`. It composes the per-field input components in `components/CalculatorInputs/` (`PrincipalInput`, `TenureLengthInput`, `AnnualRateInput`, `CompoundTypeSelect`), each a controlled component taking `value`/`onChange`/`onKeyDown` props — the actual sanitization/validation logic (`handleChange`, `handleKeyDown`, `sanitizeNumericInput`) stays in `Calculator.tsx` and is passed down, since it's shared across fields with per-field variations (e.g. `tenureLength` disallows decimals, `annualRate` caps at 999 with 3 decimal places).
- Two `useEffect`s drive recalculation: one syncs `formData` from the Zustand `currentEntry` when a saved entry is selected, the other recomputes `maturityValue`/`interestEarned`/`growthSeriesData` whenever `formData` changes (via `lib/utils/finance.ts`).
- `store/useEntriesStore.tsx` (Zustand) holds saved entries (`entries`, capped at `MAX_SAVED_ENTRIES`, FIFO-evicted via `addEntry`) and `currentEntry` (selected entry to repopulate the form; `null` when nothing's selected — the form-sync effect only fires when it's truthy). The store is generically typed via the curried `create<EntriesStore>()((set) => ...)` form (required for correct inference — see the comment in the file). This is the store actually wired up to the UI via `components/SavedEntries.tsx`.
- `lib/utils/finance.ts` holds the finance math (`maturityValue`, `interestEarned`, `growthSeries`), all built on a private `rawMaturityValue` helper so rounding only happens once at the boundary. The rationale for the hybrid compound/simple-interest formula (matching real bank behavior for tenures that don't land on a whole compounding period) is documented in `FinanceFormulas.md` — read it before touching this file.
- `lib/types.ts` is the single source for shared types (`Compounding`, `CalculationEntry`, `EntriesStore`, `CalculatorFormData`, `GrowthSeries`, etc.) — import from here rather than redefining. `CalculationEntry`'s `principal`/`tenureLength`/`annualRate` are `string`, matching the sanitized controlled-input values they're populated from — conversion to `number` only happens at calculation time in `finance.ts`.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`).

## Conventions

- The entries store is properly typed (`EntriesStore` in `lib/types.ts`); all Zustand selectors (`Calculator.tsx`, `SavedEntries.tsx`) use `(s: EntriesStore) => ...` — keep new selectors consistent with this rather than falling back to `any`.
- Skeuomorphic UI styling (soft embossed shadows, `bg-input-container`, `text-shadow-[...]` utility strings) is applied ad hoc per element via long Tailwind utility strings, not extracted into shared classes — follow the existing verbose-className style when adding UI rather than refactoring it into components/classes.
- `--skeu-highlight`/`--skeu-shadow` (in `app/globals.css`) flip per theme for the standard embossed look. `--skeu-highlight-fixed`/`--skeu-shadow-fixed` are pinned to the dark-mode values regardless of theme — use these where an element's backlight should stay constant across themes (currently only `SavedEntries.tsx`'s saved-entry squares).
- The GitHub Pages deploy workflow (`.github/workflows/nextjs.yml`) is manual (`workflow_dispatch` only), not triggered on push.

## Workflow

- For anything beyond a small fix, propose a plan first and wait for approval
- Keep changes scoped to the task; don't refactor unrelated code
- Don't add new dependencies without asking
- Summarise what changed and anything left unverified at the end
