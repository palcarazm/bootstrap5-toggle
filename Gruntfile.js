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
    clean: ["dist"],
    uglify: {
      options: {
        preserveComments: false,
        sourceMap: true,
      },
      build: {
        files: [
          {
            expand: true,
            cwd: "js",
            src: "bootstrap5-toggle.jquery.js",
            dest: "js",
            ext: ".jquery.min.js",
          },
          {
            expand: true,
            cwd: "js",
            src: "bootstrap5-toggle.ecmas.js",
            dest: "js",
            ext: ".ecmas.min.js",
          },
        ],
      },
    },
    cssmin: {
      options: {
        keepBreaks: true,
        sourceMap: true,
      },
      build: {
        expand: true,
        cwd: "css",
        src: ["**/*.css", ["!**/*.min.css"]],
        dest: "css",
        ext: ".min.css",
      },
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
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-banner");
  grunt.registerTask("default", ["clean", "uglify", "cssmin", "usebanner"]);
  grunt.registerTask("build", ["clean", "uglify", "cssmin", "usebanner"]);
  grunt.registerTask("readme", ["copy"]);
};
