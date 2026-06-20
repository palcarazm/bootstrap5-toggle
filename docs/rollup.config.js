const terser = require("@rollup/plugin-terser");

module.exports = [
  {
    input: "src/js/main.js",
    output: [
      {
        file: "dist/js/bundle.min.js",
        format: "umd",
        sourcemap: true,
        plugins: [terser()]
      }
    ]
  }
];