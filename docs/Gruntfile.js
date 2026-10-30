module.exports = function (grunt) {
    const pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        pkg,
        clean: {
            dist: ["dist"],
        },
        copy: {
            assets: {
                expand: true,
                cwd: "src/assets/",
                src: "**/*",
                dest: "dist/assets/",
            },
            api: {
                expand: true,
                cwd: "src/api/",
                src: "**/*",
                dest: "dist/api/",
            },
            cname: {
                src: "CNAME",
                dest: "dist/CNAME",
            },
            html: {
                src: "src/index.html",
                dest: "dist/index.html",
                options: {
                    process: function (content, _srcpath) {
                        return content
                            .replaceAll(
                                "{{bootstrapVersion}}",
                                pkg.dependencies.bootstrap
                            )
                            .replaceAll(
                                "{{jqueryVersion}}",
                                pkg.dependencies.jquery
                            )
                            .replaceAll(
                                "{{fontawesomeVersion}}",
                                pkg.dependencies["@fortawesome/fontawesome-free"],
                            )
                            .replaceAll(
                                "{{highlightjsVersion}}",
                                pkg.dependencies["@highlightjs/cdn-assets"],
                            )
                            .replaceAll(
                                "{{highlightjsBadgeVersion}}",
                                pkg.dependencies["highlightjs-badge"],
                            )
                            .replaceAll(
                                "{{bootstrapTocVersion}}",
                                pkg.config.externalDependencies["afeld/bootstrap-toc"],
                            )
                            .replaceAll(
                                "{{bsDarkmodeToggleVersion}}",
                                pkg.dependencies["bs-darkmode-toggle"],
                            )
                            .replaceAll(
                                "{{bootstrap5ToggleVersion}}",
                                pkg.dependencies["bootstrap5-toggle"],
                            );
                    },
                },
            },
        },
        exec: {
            rollup: "npx rollup -c",
            postcss:
        "npx postcss src/css/styles.css -o dist/css/styles.min.css --map --env production",
        },
        watch: {
            assets: {
                files: ["src/assets/**/*"],
                tasks: ["copy:assets"],
                options: { spawn: false },
            },
            api: {
                files: ["src/api/**/*"],
                tasks: ["copy:api"],
                options: { spawn: false },
            },
            css: {
                files: ["src/css/styles.css"],
                tasks: ["exec:postcss"],
                options: { spawn: false },
            },
            js: {
                files: ["src/js/**/*.js"],
                tasks: ["exec:rollup"],
                options: { spawn: false },
            },
            html: {
                files: ["src/index.html"],
                tasks: ["copy:html"],
                options: { spawn: false },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("build", ["clean", "copy", "exec:rollup", "exec:postcss"]);

    grunt.registerTask("dev", ["build", "watch"]);
};
