import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
    {
        plugins: { prettier },
        rules: {
            ...eslintConfigPrettier.rules,
            "no-console": "warn",
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "prettier/prettier": "error",
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                process: "readonly",
                console: "readonly",
            },
        },
    },
];