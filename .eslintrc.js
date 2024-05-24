module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
    },
  ],

  env: { node: true },
  parserOptions: { ecmaVersion: "latest" },
};
