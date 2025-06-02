// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// Maybe add eslint-plugin-jsx-a11y

///////////////////////////////////////////////////////////////////////////
//
// ⚠️ Flat configs are still experimental and need to be enabled in VSCode ESLint using
// the eslint.experimental.useFlatConfig setting:  "eslint.useFlatConfig": true
// That said, Editor linting may still not support all flat config features or custom rules.
//
///////////////////////////////////////////////////////////////////////////
import custom from 'custom-eslint-plugin'

/* ========================================================================

======================================================================== */
///////////////////////////////////////////////////////////////////////////
//
// eslint-config-next already comes with:
//
//   @typescript-eslint/eslint-plugin
//   @typescript-eslint/parser,
//   eslint-plugin-react
//   eslint-plugin-react-hooks
//
///////////////////////////////////////////////////////////////////////////

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  // Otherwise use: baseDirectory: __dirname
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended
})

const eslintConfig = [
  {
    ignores: ['!.storybook', 'src/generated']
  },
  // Next.js gives you ...compat.extends() by default, but you can switch to compat.config({ }).
  // This method provides a more comprehensive way to define your ESLint configuration.
  // It lets you include not only extends but also custom settings like plugins, rules, overrides, etc.
  ...compat.config({
    extends: [
      ///////////////////////////////////////////////////////////////////////////
      //
      // https://nextjs.org/docs/app/api-reference/config/eslint#additional-configurations
      // The '@eslint/js' package / 'eslint:recommended' has been added on top
      // of the default Next.js setup. Feel free to remove 'eslint:recommended'
      // if it's too restrictive.
      //
      // Note: 'eslint:recommended' has certain rules like 'no-undef': 'error.
      // However, when using TypeScript, the ESLint parser (@typescript-eslint/parser)
      // processes your code, and the no-undef rule is ignored for TypeScript files to
      // avoid redundancy and conflicts.
      //
      ///////////////////////////////////////////////////////////////////////////
      'eslint:recommended',
      'next/core-web-vitals',
      // https://nextjs.org/docs/app/api-reference/config/eslint#with-typescript
      // Based on plugin:@typescript-eslint/recommended:
      // https://typescript-eslint.io/users/configs/#recommended
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
      'next/typescript',
      'plugin:promise/recommended',

      // When 'plugin:jest/recommended' is included in the extends array, ESLint will automatically loads the jest plugin for you.
      'plugin:jest/recommended',

      // When you add 'plugin:jest-dom/recommended' to the extends array, the ESLint configuration system
      // (i.e., flat config system) automatically loads the eslint-plugin-jest-dom plugin behind the scenes.
      // Example Bad Practice: expect(button.disabled).toBe(true)
      'plugin:jest-dom/recommended',

      // Example Bad Practice:
      // const button = container.querySelector('button')
      // screen.debug()
      'plugin:testing-library/react',
      'plugin:storybook/recommended',

      // The eslint-plugin-prettier/recommended configuration is designed to set
      // up both  eslint-plugin-prettier and eslint-config-prettier in one go.
      // You stil need to install eslint-config-prettier.
      'plugin:prettier/recommended'
    ]
  }),
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: {
      custom
    },
    rules: {
      'custom/no-form-action-prop': 'warn',
      'custom/no-button-form-action-prop': 'warn',
      /* ======================
        eslint-plugin-prettier
      ====================== */

      'prettier/prettier': 'warn', // For eslint-plugin-prettier - downgrade to "warn"
      'arrow-body-style': 'off', // eslint-plugin-prettier recommendation
      'prefer-arrow-callback': 'off', // eslint-plugin-prettier recommendation

      /* ======================
              eslint 
      ====================== */

      ///////////////////////////////////////////////////////////////////////////
      //
      //   const data = { name: 'Fred',  age: 35,}
      //
      //   for (const key in data) {
      //     if (Object.prototype.hasOwnProperty.call(data, key)) {
      //       console.log(`${key}: ${data[key as keyof typeof data]}`)
      //     }
      //   }
      //
      ///////////////////////////////////////////////////////////////////////////
      'guard-for-in': 'warn', // Off by default in Next.js

      // Would require an await inside the body of an async function: export const func = async () => null
      // Off by default in Next.js
      'require-await': 'off',

      'no-var': 'warn', // Warns user to implement let or const instead.

      'prefer-const': 'warn', // Prefer const over let, etc.
      'no-throw-literal': 'warn', // Warns user to use an Error object
      'no-unreachable': 'warn', // Warns user when code is unreachable due to return, throw, etc.

      // By default, all types of anonymous default exports are forbidden, but any types can be selectively
      // allowed by toggling them on in the options. Ensuring that default exports are named helps improve
      // the grepability of the codebase by encouraging the re-use of the same identifier for the module's
      // default export at its declaration site and at its import sites.
      // We could set this to "off", but for now "warn"
      'import/no-anonymous-default-export': 'warn',
      'no-eq-null': 'warn', // Warns user to implement strict equality.
      'no-prototype-builtins': 'off',

      /* ======================
              react
      ====================== */

      'react/no-unescaped-entities': 'off', // Allow apostrophes in text...

      /* ======================
      eslint-plugin-react-compiler
      ====================== */
      //# Eventually add eslint-plugin-react-compiler
      //# "react-compiler/react-compiler": "warn",

      /* ======================
               @next 
      ====================== */

      '@next/next/no-img-element': 'off', // Allow <img> tag in Next.js

      /* ======================
      @typescript-eslint/eslint-plugin
      ====================== */

      '@typescript-eslint/ban-ts-comment': 'off', // Allows @ts-ignore statement

      '@typescript-eslint/no-non-null-assertion': 'off', // Allows ! bang operator - already "off" in Next.js by defualt.

      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/no-empty-object-type': 'off', // Allows type Props = {}
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // Ignore unused arguments that start with _
          varsIgnorePattern: '^_', // Ignore unused variables that start with _
          caughtErrorsIgnorePattern: '^_', // Ignore caught errors that start with _
          destructuredArrayIgnorePattern: '^_' // Ignore destructured array elements that start with _
        }
      ],

      /* ======================
        eslint-plugin-promise
      ====================== */

      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      'promise/param-names': 'warn',
      'promise/catch-or-return': ['warn', { allowFinally: true }],
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/avoid-new': 'off',
      'promise/no-new-statics': 'warn',
      'promise/no-return-in-finally': 'warn',
      'promise/valid-params': 'warn',
      'promise/no-multiple-resolved': 'warn',

      /* ======================
              jest
      ====================== */

      'jest/no-disabled-tests': 'off',
      'jest/no-commented-out-tests': 'off',
      'testing-library/no-debugging-utils': 'off'
    }
  }
]

export default eslintConfig
