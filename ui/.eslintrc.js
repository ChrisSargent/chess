/* eslint-disable sort-keys */
// Be sure to clear the node_modules cache after making changes here

module.exports = {
  env: {
    browser: true,
  },
  extends: [
    // Order is important here

    // Disable these for now as they results in a lot of warnings which are non-essential
    // "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // `react-app` is not included in airbnb-typescript
    "react-app",
    // Use the airbnb-typescript with react support, even though we add stricter checking later with plugin:react/all
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:jsx-a11y/recommended",
    // Re-Enable all react rules (should be after all the others)
    "plugin:react/all",
    // Add browser compatability linting
    "plugin:compat/recommended",
    // Resolves conflicting prettier/@typescript-eslint formatting rules
    "prettier",
    "prettier/@typescript-eslint",
    // Resolves conflicting prettier/react formatting rules
    "prettier/react",
  ],
  overrides: [
    {
      files: ["*.js", "*.ts"],
      rules: {
        // Disallow default exports from non-jsx files
        "import/no-default-export": "error",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "jsx-a11y"],
  root: true,
  rules: {
    // Allow explicit any
    "@typescript-eslint/no-explicit-any": "off",

    // Prevent missing return type errors - comes from @typescript-eslint/recommended
    "@typescript-eslint/explicit-function-return-type": "off",

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
    "sort-keys": ["error", "asc", { caseSensitive: false, natural: true }],

    // TODO: investigate re-enabling
    "react/jsx-props-no-spreading": "off",

    // Enforce function components being defined as arrow functions
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
      },
    ],

    // Turn off nested jsx rule
    "react/jsx-max-depth": "off",

    // Allow text in jsx components
    "react/jsx-no-literals": "off",
  },
  settings: {
    polyfills: [],
  },
};
