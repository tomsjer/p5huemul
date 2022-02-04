module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    semi: [0],
    quotes: ["error", "double"],
    "space-before-function-paren": [0],
    "no-undef": 0
  }
};
