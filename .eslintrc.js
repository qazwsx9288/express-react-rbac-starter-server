module.exports = {
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
  },
  env: {
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended', 'plugin:security/recommended', 'plugin:prettier/recommended'],
  plugins: ['jest', 'security', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'jest/expect-expect': 'off',
    'security/detect-object-injection': 'off',
    'no-unused-vars': 'warn',
  },
};
