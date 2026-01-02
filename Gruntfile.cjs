module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    banner:
      "/* Copyright Notice\n" +
      " * <%= pkg.name %> v<%= pkg.version %>\n" +
      " * <%= pkg.homepage %>\n" +
      " * @author 2011-2014 Min Hur (https://github.com/minhur)\n" +
      " * @author 2018-2019 Brent Ely (https://github.com/gitbrent)\n" +
      " * @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)\n" +
      " * @funding <%= pkg.funding.type %>\n" +
      " * @see <%= pkg.funding.url %>\n" +
      " * @license <%= pkg.license %>\n" +
      " * @see https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE\n" +
      " */\n",
    clean: ["js","css"],
    exec: {
      ts: "npx tsc",
      rollup: "npx rollup -c",
      postcss: "npx postcss src/main/css/bootstrap5-toggle.css -o css/bootstrap5-toggle.css --map",
      postcssMin: "npx postcss src/main/css/bootstrap5-toggle.css -o css/bootstrap5-toggle.min.css --map --env production"
    },
    usebanner: {
      taskName: {
        options: {
          position: "top",
          banner: "<%= banner %>",
          linebreak: true,
          replace: true,
        },
        files: {
          src: ["css/*.css", "js/*.js"],
        },
      },
    },
    copy: {
      main: {
        src: "README.template.md",
        dest: "README.md",
        options: {
          process: function (content, _srcpath) {
            let pkg = grunt.file.readJSON("package.json");
            return content.replace(/#version#/g, pkg.version);
          },
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-banner");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-exec");
  
  grunt.registerTask("default", ["clean", "exec:ts", "exec:rollup", "exec:postcss", "exec:postcssMin", "usebanner"]);
  grunt.registerTask("build", ["clean", "exec:ts", "exec:rollup", "exec:postcss", "exec:postcssMin", "usebanner"]);
  grunt.registerTask("readme", ["copy"]);
};
