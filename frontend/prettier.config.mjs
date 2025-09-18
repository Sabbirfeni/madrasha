/**
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  printWidth: 100,
  arrowParens: 'always',
  endOfLine: 'auto',
  jsxSingleQuote: false,
  tailwindFunctions: ['cva'],
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: ['^react$', '^next/(.*)$', '^@/components/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
