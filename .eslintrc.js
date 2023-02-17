module.exports = {
  extends: 'airbnb-base',
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    'arrow-parens': 'off',
    'no-multiple-empty-lines': ['error', {
      max: 2,
    }],
    'no-underscore-dangle': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'implicit-arrow-linebreak': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['src/features/**/*.state.ts'],
      rules: {
        /*  justification: Redux Toolkit uses Immer and the maintainers are fairly hostile
            about providing alternatives. It reduces accidental mutations but with it's
            WritableDraft it requires writing less functional code. Directly modifying input
            parameters is their recommended pattern. */
        'no-param-reassign': 'warn',
      },
    },
  ],
};
