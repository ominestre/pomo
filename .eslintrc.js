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
};
