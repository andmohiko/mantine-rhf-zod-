/*eslint-env node*/
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      },
      typescript: {
        config: 'tsconfig.json',
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false
        }
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/prop-types': ['off'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        endOfLine: 'lf',
        semi: false,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2
      }
    ]
  }
}
