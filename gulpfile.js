'use strict';

const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('./package.json'))

const argv = require('yargs')
	.command(['serve', '*'], 'Compile files and start server', {
		port: {
			describe: 'server port',
			type: 'number',
			default: 3000,
			alias: 'p'
		}
	})
	.epilog(' ©2019 Samuel B Grundman')
	.help('?')
	.argv;

const gulp = require('gulp');

const plugins = require('gulp-load-plugins')({
	rename: {
		'gulp-htmlmin': 'compileHTML',
		'gulp-sass': 'compileSass',
	},
});

const options = {
	compileHTML:{
		collapseWhitespace: true,
		decodeEntities: true,
		keepClosingSlash: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		useShortDoctype: true,
	},
	compileSass: {
		outputStyle: 'compressed',
		includePaths: [
			'src',
		],
	},
	dest: 'docs/',

	watch: {
		ignoreInitial: false,
		delay: 0,
	},

	webserver: {
		path: `/${packageJson.name}/`,
		directoryListing: false,
		defaultFile: 'index.html',
		fallback: 'index.html',
		livereload: true,
		port: argv.port,
	},
};

function runTasks(task) {
	const fileType = task.fileType || 'static';
	let stream = gulp.src(task.src);

	// Run each task
	if (task.tasks.length) task.tasks.forEach((subtask) => {
		let option = options[subtask] || {};
		if (option[fileType]) option = option[fileType];
		stream = stream.pipe(plugins[subtask](option));
	});

	// Output Files
	return stream.pipe(gulp.dest(task.dest || options.dest));
}

[
	{
		name: 'compile:css',
		src: [
			'src/**/*.{sa,sc,c}ss',
			'!src/scss/*.{sa,sc,c}ss',
			'!**/*.min.css',
			'!**/min.css'
		],
		tasks: [
			'compileSass',
		],
		fileType: 'css',
	},
	{
		name: 'compile:html',
		src: [
			'./src/**/*.html',
			'!**/includes/**/*.html'
		],
		tasks: [
			'compileHTML',
		],
		fileType: 'html',
	},
].forEach((task) => {
	gulp.task(task.name, () => runTasks(task));
});

gulp.task('compile', gulp.parallel(
	'compile:html',
	'compile:css',
));

gulp.task('watch', () => {
	gulp.watch([
		'./src/**/*.{sa,sc,c}ss',
	], options.watch, gulp.series('compile:css'));
	gulp.watch([
		'./src/**/*.html',
	], options.watch, gulp.series('compile:html'));
});

gulp.task('serve', () => {
	return gulp.src(options.dest)
		.pipe(plugins.webserver(options.webserver));
});

gulp.task('default', gulp.parallel('watch', 'serve'));
