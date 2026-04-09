import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

const mainConfig = {
    input: "src/main/js/index.js",
    output: [
        {
            file: "dist/bootstrap5-toggle.cjs",
            format: "cjs",
            sourcemap: false,
            plugins: [terser()]
        },
        {
            file: "dist/bootstrap5-toggle.mjs",
            format: "es",
            sourcemap: false,
            plugins: [terser()]
        }
    ]
};

const typesConfig = {
    input: "src/main/@types/index.d.ts",
    output: {
        file: "dist/bootstrap5-toggle.d.ts",
        format: "es"
    },
    plugins: [
        dts({
            respectExternal: true,
        })
    ]
};

export default [
  {
    input: "src/main/js/index.ecmas.js",
    output: [
      {
        file: "js/bootstrap5-toggle.ecmas.js",
        format: "umd",
        sourcemap: true
      },
      {
        file: "js/bootstrap5-toggle.ecmas.min.js",
        format: "umd",
        sourcemap: true,
        plugins: [terser()]
      }
    ]
  },
  {
    input: "src/main/js/index.jquery.js",
    external: ["jquery"],
    output: [
      {
        file: "js/bootstrap5-toggle.jquery.js",
        format: "umd",
        sourcemap: true,
        globals: {
          jquery: "jQuery"
        }
      },
      {
        file: "js/bootstrap5-toggle.jquery.min.js",
        format: "umd",
        sourcemap: true,
        globals: {
          jquery: "jQuery"
        },
        plugins: [terser()]
      }
    ]
  },
  mainConfig,
  typesConfig,
];
