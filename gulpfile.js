'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
$.browserify = require('browserify');
$.buffer = require('vinyl-buffer');
$.source = require('vinyl-source-stream');
$.sync = require('browser-sync');

var src_dir = "./src/";
var public_dir = "./public/";


gulp.task('gen-html', function()
{
	gulp.src(src_dir + "html/**/*").
	 pipe(gulp.dest(public_dir));
});

gulp.task('gen-js', function()
{
	var js_dir = public_dir + "js";

	$.browserify(src_dir + "js/app.js").
	 bundle().
	 pipe($.source("app.js")).
	 pipe($.buffer()).
	 pipe(gulp.dest(js_dir));

	gulp.src(src_dir + "js/vendor/*").
	 pipe(gulp.dest(js_dir));
});

gulp.task('gen-css', function()
{
	var css_dir = public_dir + "css";

	gulp.src(src_dir + "css/app.scss").
	 pipe($.sass()).
	 pipe(gulp.dest(css_dir));

	gulp.src(src_dir + "css/vendor/*").
 	 pipe(gulp.dest(css_dir));
});

gulp.task('browser-sync', function()
{
	$.sync
	({
		server: { baseDir: public_dir }
	});
});

gulp.task('browser-reload', function()
{
	$.sync.reload({stream:true});
});

gulp.task('build', ['gen-html', 'gen-js', 'gen-css'], function()
{
});

gulp.task('serve', ['build', 'browser-sync'], function()
{
	gulp.watch("src/html/**", ['gen-html', 'browser-reload']);
	gulp.watch("src/js/**/*.js", ['gen-js', 'browser-reload']);
	gulp.watch("src/sass/**/*.scss", ['gen-css', 'browser-reload']);
});
