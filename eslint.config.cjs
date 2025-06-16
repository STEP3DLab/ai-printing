module.exports = {
  ignores: ['dist', 'node_modules'],
  plugins: {
    react: require('eslint-plugin-react')
  },
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true }
    }
  },
  rules: {},
};
