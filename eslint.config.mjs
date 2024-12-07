import tsParser from '@typescript-eslint/parser';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
import * as importPlugin from 'eslint-plugin-import';
import * as prettierPlugin from 'eslint-plugin-prettier';
import * as unicornPlugin from 'eslint-plugin-unicorn';

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['build/**/*', 'node_modules/**/*'],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },

    plugins: {
      '@typescript-eslint': tsPlugin.default,
      'import': importPlugin.default,
      'prettier': prettierPlugin.default,
      'unicorn': unicornPlugin.default
    },

    rules: {
      ...tsPlugin.default.configs.recommended.rules,
      ...importPlugin.default.configs.recommended.rules,
      ...unicornPlugin.default.configs.recommended.rules,
      ...prettierPlugin.default.configs.recommended.rules,

      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      'curly': 'off',
      'no-underscore-dangle': 'off',
      'no-promise-executor-return': 'off',

      'unicorn/no-null': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/no-array-reduce': 'off',

      'import/order': [
        'error',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'never',
          'alphabetize': {
            'order': 'asc',
            'orderImportKind': 'asc',
            'caseInsensitive': true
          }
        }
      ]
    },

    settings: {
      'import/internal-regex': '^(@admin/|@/)',
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
];