// eslint.config.js

import { Linter } from "eslint";
import tsParser from "@typescript-eslint/parser";
import nextConfig from "@repo/eslint-config/next.js";

const config = /** @type {Linter.FlatConfig[]} */ ([
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        ignores: ["node_modules/"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json", // 명시적으로 경로 설정
            },
        },
        rules: {
            ...nextConfig.rules,
        },
    },
]);

export default config;
