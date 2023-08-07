/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parserOptions: {
    project: 'express/tsconfig.json',
  },
  ignorePatterns: ['.eslintrc.cjs', 'dist'],
};
