import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/js/index.ecmas.js",
    output: [
      {
        file: "js/bootstrap5-toggle.ecmas.js",
        format: "iife",
        sourcemap: true
      },
      {
        file: "js/bootstrap5-toggle.ecmas.min.js",
        format: "iife",
        sourcemap: true,
        plugins: [terser()]
      }
    ]
  },
  {
    input: "src/js/index.jquery.js",
    external: ["jquery"],
    output: [
      {
        file: "js/bootstrap5-toggle.jquery.js",
        format: "iife",
        sourcemap: true,
        globals: {
          jquery: "jQuery"
        }
      },
      {
        file: "js/bootstrap5-toggle.jquery.min.js",
        format: "iife",
        sourcemap: true,
        globals: {
          jquery: "jQuery"
        },
        plugins: [terser()]
      }
    ]
  }
];
