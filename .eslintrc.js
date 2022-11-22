module.exports = {
  extends: 'airbnb-base',
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
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
  },
};
