module.exports = {
  env: {
    "jest/globals": true,
    // Already included by `airbnb-typescript/base`
    // node: true,
  },
  extends: [
    // Disable these for now as they results in a lot of warnings which are non-essential
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // `airbnb-typescript` gives stylistic opinions
    "airbnb-typescript/base",
    // Resolves conflicting prettier formatting rules
    "prettier",
    "prettier/@typescript-eslint",
  ],
  // Already included by `airbnb-typescript/base`
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["jest"],
  root: true,
  rules: {
    // Require braces in arrow function body as needed
    "arrow-body-style": ["error", "as-needed"],

    // Prevent default exports
    "import/no-default-export": "error",

    // Allow dev dependencies
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],

    // Enforce import order and no spaces
    "import/order": ["error", { "newlines-between": "never" }],

    // Allow name exports from files with a single export
    "import/prefer-default-export": "off",

    // Prefer arrow functions in callbacks
    "prefer-arrow-callback": "error",

    // Sort imports
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],

    // Sort keys in objects etc
    "sort-keys": ["error", "asc", { caseSensitive: false, natural: true }],
  },
};
