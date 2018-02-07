'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


gulp.task('browser-sync', function()
{
	browserSync
	({
		server:
		{
			baseDir: "./public"
		}
	});
});

gulp.task('browser-reload', function()
{
	browserSync.reload({stream:true});
});

gulp.task('gen-js', function()
{
	return browserify("src/js/app.js").
		bundle().
		pipe(source("app.js")).
		pipe(buffer()).
		pipe(gulp.dest("public/js")).
		pipe(browserSync.reload({stream:true}));
});

gulp.task('gen-css', function()
{
	return gulp.src("src/sass/app.scss").
		pipe(sass()).
		pipe(gulp.dest("public/css")).
		pipe(browserSync.reload({stream:true}));
});

gulp.task('serve', ['gen-js', 'gen-css', 'browser-sync'], function()
{
	gulp.watch("src/js/**/*.js", ["gen-js"]);
	gulp.watch("src/sass/**/*.scss", ["gen-css"]);
	gulp.watch("public/*.html", ["browser-reload"]);
});
