# JPetStore Demo UI Automation (Playwright TS)

This project automates core user flows on the JPetStore Demo using Playwright with TypeScript. Tasks include:

- User Registration (dynamic data)
- Sign In (using registered credentials)
- Add to Cart (after sign-in)

HTML test reporting is enabled via Playwright's `html` reporter.

## Prerequisites
- Node.js 18+ and npm on Windows/macOS/Linux
- For first run, Playwright browsers must be installed.

## Setup
```bash
npm install
npm run install:browsers
```

## Run Tests
- Run all:
```bash
npm test
```
- Run headed (visible browser):
```bash
npm run test:headed
```
- Run a single task/spec:
```bash
npx playwright test tests/register.spec.ts
npx playwright test tests/signin.spec.ts
npx playwright test tests/add_to_cart.spec.ts
```

## View HTML Report
After a test run, open the HTML report:
```bash
npm run report
```
The report will open in your default browser.

## Project Structure
- `pages/` — Page Objects (`RegistrationPage`, `SignInPage`, `CatalogPage`)
- `tests/` — Independent specs per task
- `utils/` — Helpers for dynamic test data
- `playwright.config.ts` — Playwright configuration (HTML reporter enabled)

## CI/CD (GitHub Actions)
A workflow is included for manual dispatch or scheduled runs. It installs dependencies, Playwright browsers, runs tests, and uploads the HTML report as an artifact.

See `.github/workflows/playwright.yml`.

## Notes
- Registration and sign-in use resilient label- and role-based selectors.
- Registration generates a unique username/password per run to avoid collisions.
- Add-to-cart selects the Fish category by default, falling back to the first category if needed.

## Troubleshooting
- If tests fail due to site slowness, re-run with `--headed` and `--debug`:
```bash
npx playwright test --headed --debug
```
- Reinstall browsers if needed:
```bash
npm run install:browsers
```