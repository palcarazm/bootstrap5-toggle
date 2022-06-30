module.exports = function(grunt){
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['dist'],
		uglify: {
			options: {
				banner: '/*!\n* Bootstrap Toggle: bootstrap5-toggle.css v<%= pkg.version %>\n* https://palcarazm.github.io/bootstrap5-toggle/\n*\n* @author 2011-2014 Min Hur (https://github.com/minhur)\n* @author 2018-2019 Brent Ely (https://github.com/gitbrent)\n* @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)\n* @lisense MIT License\n* @see https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE\n* @preserve\n*/\n',
				preserveComments: false,
				sourceMap: true
			},
			build: {
				expand: true,
				cwd: 'js',
				src: ['**/*.js', ['!**/*.min.js']],
				dest: 'js',
				ext: '.min.js',
			}
		},
		cssmin: {
			options: {
				keepBreaks: true,
				banner: '/*!\n* Bootstrap Toggle: bootstrap5-toggle.css v<%= pkg.version %>\n* https://palcarazm.github.io/bootstrap5-toggle/\n*\n* @author 2011-2014 Min Hur (https://github.com/minhur)\n* @author 2018-2019 Brent Ely (https://github.com/gitbrent)\n* @author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)\n* @lisense MIT License\n* @see https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE\n* @preserve\n*/\n',
			},
			build: {
				expand: true,
				cwd: 'css',
				src: ['**/*.css', ['!**/*.min.css']],
				dest: 'css',
				ext: '.min.css',
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['clean', 'uglify', 'cssmin']);
};
