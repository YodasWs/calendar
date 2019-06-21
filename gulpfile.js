'use strict';

const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('./package.json'))

const argv = require('yargs')
	.command(['serve', '*'], 'Compile files and start server', {
		port: {
			describe: 'The server port to listen to',
			type: 'number',
			default: 3000,
			alias: 'p'
		}
	})
	.command('watch', 'Watch files for changes to recompile')
	.epilog(' ©2019 Samuel B Grundman')
	.help('?')
	.argv;

const gulp = require('gulp');

const plugins = require('gulp-load-plugins')({
});

const options = {
	webserver: {
		path: `/${packageJson.name}/`,
		directoryListing: false,
		defaultFile: 'index.html',
		fallback: 'index.html',
		livereload: true,
		port: argv.port,
	},
};

gulp.task('serve', () => {
	return gulp.src('.')
		.pipe(plugins.webserver(options.webserver));
});

gulp.task('default', gulp.series('serve'));
