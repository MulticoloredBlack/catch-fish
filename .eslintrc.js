module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/type-annotation-spacing': [
      'error', 
      { before: false, after: true }
    ],
    '@typescript-eslint/semi': 'warn',
    'no-var-requires': 'off',
    curly: 'warn',
    eqeqeq: 'warn',
    'no-throw-literal': 'warn',
    semi: 'off',
    'comma-spacing': ['error', { before: false, after: true }],
    'keyword-spacing': ['error', { after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'object-curly-spacing': ['error', 'always'],
    'indent': ['error', 2]
  },
};
