module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script",
        "ecmaVersion": "latest"
      }
    }
  ],
  "rules": {
    'import/extensions': 'off',
    'prettier/prettier': [
        'error',
        {
            endOfLine: 'auto',
        },
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "object-shorthand": "error",
    "no-console": "error",
    "prefer-destructuring": "warn",
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "no-undef": "off"
  }
};
