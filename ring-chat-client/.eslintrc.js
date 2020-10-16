module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-irregular-whitespace': 'off',
        'prefer-spread': 0,
        'no-plusplus': 0,
        'max-len': 0,
        'no-underscore-dangle': 0,
        'eslint-disable-next-line': 'off',
        '@typescript-eslint/no-explicit-any': ['off'],
    },
};
