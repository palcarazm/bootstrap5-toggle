import terser from "@rollup/plugin-terser";

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
  }
];
