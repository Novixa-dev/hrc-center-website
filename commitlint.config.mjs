/** Conventional Commits — see docs/guides/git-workflow.md. */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'research',
        'planning',
        'design',
        'skills',
        'content',
        'i18n',
        'scaffold',
        'home',
        'about',
        'services',
        'training',
        'research-page',
        'conferences',
        'team',
        'news',
        'contact',
        'ui',
        'layout',
        'motion',
        'seo',
        'a11y',
        'perf',
        'test',
        'deps',
        'sprint',
        'brand',
        'og',
      ],
    ],
    'scope-empty': [0],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};

export default config;
