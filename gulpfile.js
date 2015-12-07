'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	jsHintStylish = require('jshint-stylish'),
	inject = require('gulp-inject'),
	concat = require('gulp-concat'),
	wiredep = require('wiredep').stream,
	mainBowerFiles = require('gulp-main-bower-files'),
	del = require('del');

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var sassInput = './app/styles/**/*.scss',
	sassOutput = './dist/css/';

var htmlInput = './app/*.html',
	htmlOutput = './dist/';
	
var scriptsInput = './app/**/*.js',
	scriptsOutput = './dist/scripts/';
	
var bowerInput = './bower_components/**/*',
	bowerOutput = './dist/lib/';

gulp.task('copy', function(){
	gulp.src(bowerInput)
		.pipe(gulp.dest('dist/lib', { base : '.'}));
});

gulp.task('html', ['copy'], function(){
	return gulp.src(htmlInput)
		.pipe(gulp.dest(htmlOutput));
});

gulp.task('scripts', ['html'], function(){
	return gulp.src(scriptsInput)
		.pipe(jshint())
		.pipe(jshint.reporter(jsHintStylish))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(scriptsOutput));
});

gulp.task('bower', ['html'], function(){
	return gulp.src('./dist/*.html')
		.pipe(wiredep({
			directory : './dist/lib/'
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('sass', ['html'], function () {
	var options = {
		errLogToConsole: true,
		outputStyle: 'expanded'
	};

	return gulp.src(sassInput)
		.pipe(sourcemaps.init())
		.pipe(sass(options).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(sourcemaps.write())
		.pipe(concat('app.css'))
		.pipe(gulp.dest(sassOutput));
});

gulp.task('watch', function () {
	return gulp.watch(sassInput, ['sass'])
		.on('change', function(event){
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('prod', function(){
	return gulp.src(sassInput)
		.pipe(sass({outputStyle : 'compressed'}))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(concat('app.css'))
		.pipe(gulp.dest(sassOutput));
});

gulp.task('clean', function(){
	del(['./dist/']);
});

gulp.task('inject', ['bower', 'sass', 'scripts'], function(){
	var target = gulp.src('./dist/*.html'),
		sourceJs = gulp.src('./dist/scripts/app.js'),
		sourceCss = gulp.src('./dist/css/app.css');
	return target.pipe(inject(sourceJs, {
		starttag : '<!-- inject:js -->',
		relative : true
	})).pipe(inject(sourceCss, {
		starttag : '<!-- inject:css -->',
		relative : true
	}))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['inject']);