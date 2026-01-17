import globals from "globals";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        ignores: ["src/main/js/**", "js", "node_modules"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
        rules: {
            indent: ["error", 4],
            quotes: ["error", "double", { avoidEscape: true }],
            semi: ["error", "always"],
        },
    },
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tsEslintPlugin,
        },
        rules: {
            ...tsEslintPlugin.configs.recommended.rules,
            "@typescript-eslint/no-explicit-any": ["error"],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "args": "all",
                    "argsIgnorePattern": "^_",
                    "caughtErrors": "all",
                    "caughtErrorsIgnorePattern": "^_",
                    "destructuredArrayIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "ignoreRestSiblings": true
                }
            ]
        },
    },
];
