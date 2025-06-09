import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPlaywright from 'eslint-plugin-playwright';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // ✅ Prettier config block
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },

  // ✅ Playwright config block
  {
    files: ['**/*.spec.{js,ts,jsx,tsx}', '**/*.test.{js,ts,jsx,tsx}'],
    plugins: {
      playwright: pluginPlaywright,
    },
    languageOptions: {
      globals: globals.node,
    },
    rules: pluginPlaywright.configs.recommended.rules,
  },
]);
