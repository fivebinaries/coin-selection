// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config({
  files: ['**/*.ts'], // Applies to TypeScript files
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: './tsconfig.types.json', // Ensure this path is correct
      tsconfigRootDir: './', // This helps in locating tsconfig.json
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    prettier: eslintPluginPrettierRecommended.plugins.prettier,
  },
  rules: {
    'no-console': 'off',
    'arrow-parens': [2, 'as-needed'],
    // 'prettier/prettier': 2,
  },
  ignores: ['dist', 'node_modules', '.eslintrc.js', 'jest.config.js', 'lib'],
});
