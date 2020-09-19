// Be sure to clear the node_modules cache after making changes here
module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "airbnb-typescript/base",
    // Add browser compatability linting
    "plugin:compat/recommended",
    // Resolves conflicting prettier/@typescript-eslint formatting rules
    "prettier",
    "prettier/@typescript-eslint",
  ],
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "no-console": "off",

    // Require braces in arrow function body as needed
    "arrow-body-style": ["error", "as-needed"],

    // Allow dev dependencies
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],

    // Enforce import order and no spaces
    "import/order": ["error", { "newlines-between": "never" }],

    // Allow named exports from files with a single export
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
    "sort-keys-fix": ["error", "asc", { caseSensitive: false, natural: true }],
  },
  settings: {
    polyfills: [],
  },
};
