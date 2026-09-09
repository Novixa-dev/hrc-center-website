/**
 * Lighthouse CI — performance budget from docs/planning/04-technical-architecture.md §7.
 * Runs against a local production build. `NEXT_PUBLIC_SITE_URL` is set to the test
 * origin so the canonical/hreflang audits resolve.
 */
const PORT = 3105;
const ORIGIN = `http://localhost:${PORT}`;

module.exports = {
  ci: {
    collect: {
      startServerCommand: `NEXT_PUBLIC_SITE_URL=${ORIGIN} pnpm start -p ${PORT}`,
      startServerReadyPattern: 'Ready|started server|Local:',
      startServerReadyTimeout: 60000,
      url: [`${ORIGIN}/ar`, `${ORIGIN}/en`],
      numberOfRuns: 3,
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 2,
          disabled: false,
        },
        throttlingMethod: 'simulate',
      },
    },
    assert: {
      assertions: {
        // Performance is a `warn` during feature sprints (S3–S6); the S7 hardening
        // sprint flips it to `error` once the budget work is done.
        'categories:performance': ['warn', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['warn', { maxNumericValue: 250 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './lighthouse-reports' },
  },
};
