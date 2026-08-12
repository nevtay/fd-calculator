# Fixed Deposit Calculator

A calculator for estimating the maturity value and interest earned on a fixed deposit, with a chart visualizing balance growth over the deposit's tenure.

**Live site:** https://nevtay.github.io/fd-calculator/

## Features

- Calculates maturity value and interest earned from principal, annual interest rate, tenure (in months), and compounding frequency (monthly, quarterly, annually, or simple interest at maturity)
- Uses a hybrid compound/simple-interest formula so results match real-world bank calculations for tenures that don't land on a whole compounding period (see `FInanceFormulas.md`)
- Bar chart (via Recharts) plotting balance growth month-by-month across the tenure
- Light/dark theme toggle with persisted preference
- Sanitized numeric inputs (digits only, single decimal point where applicable) and a form reset
- Responsive, skeuomorphic-styled UI built with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, static export) with [React](https://react.dev) and TypeScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Recharts](https://recharts.org) for the growth chart
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [Zustand](https://zustand-demo.pmnd.rs) for state management
- [Jest](https://jestjs.io) for unit tests
- Deployed to GitHub Pages via GitHub Actions

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page auto-updates as you edit `app/page.tsx` or `components/`.

## Other Scripts

```bash
npm run build          # static export build (output: "out/")
npm start               # serve the production build
npm run lint            # lint the codebase
npm test                # run the Jest test suite
npm run test:coverage   # run tests with coverage report
```

## Deployment

The site is built as a static export (`next.config.ts` sets `output: "export"`) and deployed to GitHub Pages by the `Deploy Next.js site to Pages` workflow in `.github/workflows/nextjs.yml`.
