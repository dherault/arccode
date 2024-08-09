module.exports = {
  root: true,
  extends: ['dherault-typescript'],
  rules: {
    'newline-per-chained-call': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
        ],
        pathGroupsExcludedImportTypes: [],
        pathGroups: [
          {
            pattern: '~vendor/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~types',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~constants',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~firebase',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~logic/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~contexts/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~hooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~app/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~emails/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~data/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '~router/**',
            group: 'internal',
            position: 'after',
          },
        ],
      },
    ],
  },
}
