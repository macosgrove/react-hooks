module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'space-before-function-paren': ['warn', 'never'],
    'comma-dangle': ['off'],
    'react/prop-types': ['off'],
    'object-curly-spacing': ['off'],
    'react/no-unescaped-entities': ['off'],
    'lines-between-class-members': ['warn'],
    indent: ['warn'],
    quotes: ['warn'],
    'prefer-const': ['warn'],
    'react-hooks/exhaustive-deps': ['error'],
  },
  overrides: [
    {
      files: ['**/__tests__/*.js'],
      env: {
        jest: true,
      },
    },
  ],
}
