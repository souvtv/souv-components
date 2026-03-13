// @ts-check
import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import * as importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import checkFile from 'eslint-plugin-check-file'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

const project = './tsconfig.json'

// /** @type {import('eslint').Linter.Config[]} */
export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.wrangler/**',
      '**/public/**',
      '**/tests/**',
      '**/docs/**',
      '**/dev/**',
      '**/package.json',
      '**/bun.lock',
      '**/yarn.lock',
      '**/tsconfig.json',
      '**/*.min.js',
      '**/coverage/**',
      '**/.git/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/*.md',
      '**/*.json'
    ],
  },
  // Configuração específica para React/Preact
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,

      'object-shorthand': ['error', 'always'],

      // TypeScript já faz a checagem de props
      'react/display-name': 'off',

      // Garante que variáveis JSX (h, Fragment) não sejam marcadas como unused
      'react/jsx-boolean-value': 'error',

      'react/jsx-curly-brace-presence': [
        'warn',
        {
          children: 'ignore',
          propElementValues: 'always',
          props: 'always',
        },
      ],

      'react/jsx-no-bind': [
        'warn',
        {
          allowArrowFunctions: false,
          allowBind: false,
          allowFunctions: false,
          ignoreDOMComponents: true,
          ignoreRefs: true,
        },
      ],

      'react/jsx-uses-react': 'error',

      // Garante que React não seja marcado como unused
      'react/jsx-uses-vars': 'error',

      'react/prop-types': 'off',

      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        pragma: 'h',
        // Para compatibilidade com Preact
        pragmaFrag: 'Fragment',
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{jsx,tsx}', '**/use*.{js,ts}', '**/use*.{jsx,tsx}'],
    ...reactHooks.configs['recommended-latest'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
  // Base JavaScript/TypeScript config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        Buffer: 'readonly',
        JSX: 'readonly',
        React: 'readonly',

        __dirname: 'readonly',

        __filename: 'readonly',

        console: 'readonly',

        document: 'readonly',

        fetch: 'readonly',

        global: 'readonly',

        globalThis: 'readonly',

        h: 'readonly',
        // Define h como global para Preact
        jsdom: 'readonly',
        navigator: 'readonly',
        process: 'readonly',
        window: 'readonly',
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        jsxPragma: 'h',
        project: project,
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname, // Especifica que o pragma JSX é 'h'
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      prettier: prettier,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...prettierConfig.rules,

      // TypeScript specific rules
      '@typescript-eslint/await-thenable': 'warn',

      '@typescript-eslint/explicit-function-return-type': 'off',

      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // Disable some problematic rules for more performance
      '@typescript-eslint/no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          enableAutofixRemoval: {
            imports: true,
          },
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-var-requires': 'warn',

      '@typescript-eslint/require-await': 'warn',

      '@typescript-eslint/restrict-plus-operands': 'error',

      'arrow-body-style': ['error', 'as-needed'],

      'arrow-parens': ['error', 'as-needed'],

      camelcase: 'off',

      'consistent-return': 'off',

      eqeqeq: 'error',

      'eslint-comments/no-unused-disable': 'off',

      'func-names': 'off',

      'import/default': 'error',

      'import/export': 'error',

      'import/first': 'error',

      'import/named': 'error',

      'import/namespace': 'error',

      'import/newline-after-import': 'error',

      'import/no-duplicates': 'error',

      'import/no-empty-named-blocks': 'error',

      'import/no-named-as-default': 'off',

      // Import rules
      'import/no-named-as-default-member': 'off',

      'import/no-unresolved': 'off',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'object', 'type', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      'linebreak-style': ['error', 'unix'],

      'new-cap': 'off',

      'no-async-promise-executor': 'off',

      'no-confusing-arrow': 'off',

      'no-console': [
        'warn',
        {
          allow: ['time', 'timeEnd', 'info', 'warn', 'error', 'debug', 'assert', 'count', 'dir'],
        },
      ],

      'no-empty': 'warn',
      'no-empty-function': 'warn',

      'no-empty-pattern': 'warn',

      'no-extra-boolean-cast': 'error',

      'no-extra-semi': 'off',

      // General rules
      'no-implied-eval': 'off',

      'no-multi-str': 'off',

      'no-nested-ternary': 'off',

      'no-param-reassign': ['warn', { props: false }],

      'no-undef': 'off',

      'no-underscore-dangle': 'off',

      'no-unused-expressions': 'off',

      'no-unused-vars': 'off',

      'no-useless-computed-key': 'error',

      'no-useless-escape': 'warn',

      'no-useless-return': 'error',

      'object-shorthand': ['error', 'always'],

      'prefer-arrow-callback': 'warn',

      'prefer-const': 'error',

      'prefer-promise-reject-errors': 'warn',

      'prefer-template': 'error',

      // Prettier
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          endOfLine: 'lf',
          printWidth: 122,
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          useTabs: false,
        },
        { usePrettierrc: false },
      ],

      'require-await': 'off',

      'require-jsdoc': 'off',

      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: true,
          minKeys: 2,
          natural: false,
        },
      ],

      // Sort keys
      'sort-keys-fix/sort-keys-fix': 'error',

      'spaced-comment': 'error',

      'valid-typeof': 'error',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['*.ts', '*.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['*.js', '*.ts', '*.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: project,
        },
      },
    },
  },

  // JavaScript-only config (sem TypeScript)
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        Buffer: 'readonly',
        JSX: 'readonly',
        React: 'readonly',

        __dirname: 'readonly',

        __filename: 'readonly',

        console: 'readonly',

        document: 'readonly',

        fetch: 'readonly',

        global: 'readonly',

        globalThis: 'readonly',

        h: 'readonly',
        // Define h como global para Preact
        jsdom: 'readonly',
        navigator: 'readonly',
        process: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: 'module',
    },
    plugins: {
      import: importPlugin,
      prettier: prettier,
      'sort-keys-fix': sortKeysFix,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettierConfig.rules,

      'arrow-body-style': ['error', 'as-needed'],

      'arrow-parens': ['error', 'as-needed'],

      camelcase: 'off',

      'consistent-return': 'off',

      eqeqeq: 'error',

      'func-names': 'off',

      'import/default': 'error',

      'import/export': 'error',

      'import/first': 'error',

      'import/named': 'error',

      'import/namespace': 'error',

      'import/newline-after-import': 'error',

      'import/no-duplicates': 'error',

      'import/no-empty-named-blocks': 'error',

      'import/no-named-as-default': 'off',

      // Import rules
      'import/no-named-as-default-member': 'off',

      'import/no-unresolved': 'off',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'object', 'type', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      'linebreak-style': ['error', 'unix'],

      'new-cap': 'off',

      'no-async-promise-executor': 'off',

      'no-confusing-arrow': 'off',

      'no-console': [
        'warn',
        {
          allow: ['time', 'timeEnd', 'info', 'warn', 'error', 'debug', 'assert', 'count', 'dir'],
        },
      ],

      'no-empty-function': 'warn',

      'no-extra-boolean-cast': 'error',

      'no-extra-semi': 'off',

      'no-multi-str': 'off',

      'no-nested-ternary': 'off',

      'no-param-reassign': ['warn', { props: false }],

      'no-undef': 'off',
      'no-underscore-dangle': 'off',

      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],

      'no-useless-computed-key': 'error',

      'no-useless-escape': 'warn',

      'no-useless-return': 'error',

      'prefer-arrow-callback': 'warn',

      'prefer-const': 'error',

      'prefer-promise-reject-errors': 'warn',

      'prefer-template': 'error',

      // Prettier
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'avoid',
          endOfLine: 'lf',
          printWidth: 122,
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
          useTabs: false,
        },
        { usePrettierrc: false },
      ],

      'require-jsdoc': 'off',

      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: true,
          minKeys: 2,
          natural: false,
        },
      ],

      // Sort keys
      'sort-keys-fix/sort-keys-fix': 'error',

      'spaced-comment': 'error',

      // General rules
      'valid-typeof': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['*.js', '*.jsx'],
        },
      },
    },
  },
  // Configuração específica para arquivos especiais (index, app, main, eslint.config) - exceções primeiro
  {
    files: ['**/index.{js,jsx,ts,tsx}', '**/app.{js,jsx,ts,tsx}', '**/main.{js,jsx,ts,tsx}', '**/eslint.config.js'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': 'off', // Desabilita para arquivos especiais
    },
  },

  // Configuração para nomenclatura de pastas
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
      ],
    },
  },

  // Configuração para arquivos JS/TS não-React (padrão camelCase)
  {
    files: ['**/*.{js,ts}'],
    ignores: [
      '**/use*.{js,ts}',
      '**/index.{js,ts}',
      '**/app.{js,ts}',
      '**/main.{js,ts}',
      '**/*.d.ts',
      '**/*.config.{js,ts,mjs}',
    ],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,ts}': 'CAMEL_CASE',
        },
      ],
    },
  },

  // Configuração para hooks
  {
    files: ['**/use*.{js,ts}', '**/use*.{jsx,tsx}'],
    ignores: ['**/*.d.ts'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,ts}': 'CAMEL_CASE',
        },
      ],
    },
  },

  // Configuração para nomenclatura de react
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/*': 'CAMEL_CASE',
        },
      ],
    },
  },
  // Configuração para componentes React (PascalCase)
  {
    files: ['**/*.{jsx,tsx}'],
    ignores: ['**/index.{jsx,tsx}', '**/app.{jsx,tsx}', '**/main.{jsx,tsx}'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{jsx,tsx}': 'PASCAL_CASE',
        },
      ],
    },
  },

  // Configuração para outros tipos de arquivo
  {
    files: ['**/*.{json,md}'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{json,md}': 'KEBAB_CASE',
        },
      ],
    },
  },

]
