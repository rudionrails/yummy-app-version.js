module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },

  env: { node: true },
  parserOptions: { ecmaVersion: "latest" },
};
