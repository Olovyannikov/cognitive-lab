import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

import path from 'path';
import { fileURLToPath } from 'url';
import { resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config([
    js.configs.recommended,
    ...tseslint.configs.strict,
    new FlatCompat({
        baseDirectory: __dirname,
    }).plugins(),
    {
        languageOptions: {
            parserOptions: {
                project: resolve(process.cwd(), 'tsconfig.json'),
                globals: {
                    ...globals.browser,
                    ...globals.node,
                    ...globals.es2020,
                    React: true,
                    JSX: true,
                },
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: eslintReact,
            'react-hooks': eslintReactHooks,
            'react-refresh': eslintReactRefresh,
            prettier: prettierPlugin,
            'simple-import-sort': pluginSimpleImportSort,
        },
        files: ['**/*.{ts,tsx}'],
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            'no-empty': 'warn',
            'no-else-return': 'warn',
            'no-nested-ternary': 'warn',
            'no-useless-computed-key': 'warn',
            'no-unsafe-optional-chaining': 'warn',
            'no-param-reassign': [
                'error',
                {
                    props: false,
                },
            ],
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error'],
                },
            ],
            'no-implicit-coercion': 'error',
            'prefer-const': 'error',
            'max-lines': ['warn', { max: 124 }],
            'max-params': ['error', 3],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
            'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
            'react/self-closing-comp': ['error', { component: true, html: true }],
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        ['^react', '^@?\\w'],
                        /* import 'foo*' or '@foo' */
                        ['^\\u0000@?\\w'],
                        /* import from '@/foo' */
                        ['^@/\\w'],
                        /* import .. from './foo' */
                        ['^\\.'],
                        /* import styles */
                        ['^.+\\.?(scss)$'],
                    ],
                },
            ],
            '@typescript-eslint/no-invalid-void-type': 'off',
            '@typescript-eslint/no-namespace': 'warn',
        },
    },
    {
        files: ['pages/**/*', 'src/app/**/*'],
        rules: {
            'import/no-default-export': 'off',
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'function-declaration',
                },
            ],
        },
    },
    {
        ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
    },
    {
        files: ['express-entry.ts'],
        rules: {
            'no-console': 'off',
        },
    },
]);
