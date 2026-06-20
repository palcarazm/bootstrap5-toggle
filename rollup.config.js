import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { bannerContent } from "./scripts/package-banner.js";

const banner = `/*
 * ${bannerContent.replaceAll("\n", "\n * ")}
 */`;

const umdECMAS = {
    input: "src/main/js/index.ecmas.js",
    output: [
        {
            file: "js/bootstrap5-toggle.ecmas.js",
            format: "umd",
            sourcemap: true,
            banner,
        },
        {
            file: "js/bootstrap5-toggle.ecmas.min.js",
            format: "umd",
            sourcemap: true,
            plugins: [terser()],
            banner,
        },
    ],
};

const umdJquery = {
    input: "src/main/js/index.jquery.js",
    external: ["jquery"],
    output: [
        {
            file: "js/bootstrap5-toggle.jquery.js",
            format: "umd",
            sourcemap: true,
            globals: {
                jquery: "jQuery",
            },
            banner,
        },
        {
            file: "js/bootstrap5-toggle.jquery.min.js",
            format: "umd",
            sourcemap: true,
            globals: {
                jquery: "jQuery",
            },
            plugins: [terser()],
            banner,
        },
    ],
};

const mainConfig = {
    input: "src/main/js/index.js",
    output: [
        {
            file: "dist/bootstrap5-toggle.cjs",
            format: "cjs",
            sourcemap: true,
            plugins: [terser()],
            banner,
        },
        {
            file: "dist/bootstrap5-toggle.mjs",
            format: "es",
            sourcemap: true,
            plugins: [terser()],
            banner,
        },
    ],
};

const typesConfig = {
    input: "dist/tmp/@types/index.d.ts",
    output: {
        file: "dist/bootstrap5-toggle.d.ts",
        format: "es",
        banner,
    },
    plugins: [
        dts({
            respectExternal: true,
        }),
    ],
};

export default [umdECMAS, umdJquery, mainConfig, typesConfig];
