import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const tokensCss = readFileSync(
  join(process.cwd(), 'src/styles/tokens.css'),
  'utf8',
);

/**
 * Guards that the token contract in docs/design/02-design-tokens.md survives edits.
 * (Computed-style checks live in the Playwright suite, which runs a real browser.)
 */
describe('design tokens', () => {
  const required: Record<string, RegExp> = {
    '--color-bg': /--color-bg:\s*var\(--slate-50\)/,
    '--color-text': /--color-text:\s*var\(--ink\)/,
    '--color-heading': /--color-heading:\s*var\(--navy-500\)/,
    '--color-accent': /--color-accent:\s*var\(--bronze-600\)/,
    '--color-accent-fill': /--color-accent-fill:\s*var\(--bronze-500\)/,
    '--color-focus-ring': /--color-focus-ring:\s*var\(--blue-600\)/,
    '--space-4': /--space-4:\s*16px/,
    '--radius-lg': /--radius-lg:\s*14px/,
    '--control-min-h': /--control-min-h:\s*44px/,
    '--duration-base': /--duration-base:\s*240ms/,
    '--ease-out': /--ease-out:\s*cubic-bezier\(0\.16,\s*1,\s*0\.3,\s*1\)/,
  };

  for (const [name, pattern] of Object.entries(required)) {
    it(`defines ${name}`, () => {
      expect(tokensCss).toMatch(pattern);
    });
  }

  it('ships the three-state theme pattern', () => {
    expect(tokensCss).toContain('@media (prefers-color-scheme: dark)');
    expect(tokensCss).toContain(":root:not([data-theme='light'])");
    expect(tokensCss).toContain(":root[data-theme='dark']");
  });

  it('key bronze primitives match the S1 sign-off', () => {
    expect(tokensCss).toMatch(/--bronze-500:\s*#a16207/);
    expect(tokensCss).toMatch(/--bronze-600:\s*#854d0e/);
  });

  it('defines all 5 typography font stacks with proper fallbacks', () => {
    expect(tokensCss).toMatch(/--font-ar-display:\s*var\(--next-font-amiri\)/);
    expect(tokensCss).toMatch(/--font-ar-body:\s*var\(--next-font-plex-ar\)/);
    expect(tokensCss).toMatch(
      /--font-latin-display:\s*var\(--next-font-garamond\)/,
    );
    expect(tokensCss).toMatch(/--font-latin-body:\s*var\(--next-font-inter\)/);
    expect(tokensCss).toMatch(/--font-mono:\s*var\(--next-font-plex-mono\)/);
  });
});
