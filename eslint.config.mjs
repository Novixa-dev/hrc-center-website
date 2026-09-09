import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

/**
 * eslint-config-next brings: @next/next, react, react-hooks, jsx-a11y
 * (recommended), import, and typescript-eslint. Flat config only lets rules be
 * set in the same object that registers their plugin, so project-specific rule
 * tweaks live in `.eslintrc-overrides` conventions in docs/guides/coding-standards.md
 * and are enforced in review (plus `strict` tsconfig for `any`).
 */
/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'lighthouse-reports/**',
      '.lighthouseci/**',
      'next-env.d.ts',
      '.claude/**',
      'docs/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  prettier,
];

export default config;
