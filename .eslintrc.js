module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    semi: ['error', 'always'],
    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/display-name': ['off'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-empty-function': ['warn', { allow: ['arrowFunctions'] }],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    'no-console': 'warn',
    'no-shadow': 'off',
    'max-len': [
      'off',
      {
        code: 80,
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/prefer-as-const': 'warn',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};
