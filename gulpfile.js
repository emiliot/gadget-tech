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
	bowerSrc = require('gulp-bower-src'),
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

gulp.task('bower', function(){
	return bowerSrc()
		.pipe(gulp.dest(bowerOutput));
});

gulp.task('assets', function(){
	gulp.src('./app/img/**/*')
		.pipe(gulp.dest('./dist/img/'));
});

gulp.task('html', function(){
	gulp.src('./app/layout/*')
		.pipe(gulp.dest('./dist/layout/'));
		
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

gulp.task('sass', function () {
	var options = {
		errLogToConsole: true,
		outputStyle: 'expanded'
	};

	return gulp.src(sassInput)
		.pipe(sourcemaps.init())
		.pipe(sass(options).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(wiredep({
            directory: 'dist/bower_components',
        }))
		.pipe(sourcemaps.write())
		// .pipe(concat('app.css'))
		.pipe(gulp.dest(sassOutput));
});

gulp.task('clean', function(){
	del(['./dist/*', '!./dist/bower_components']);
});

gulp.task('inject', [ 'sass', 'scripts', 'html', 'assets'], function(){
	var target = gulp.src('./dist/index.html'),
		sourceJs = gulp.src('./dist/scripts/app.js'),
		sourceCss = gulp.src('./dist/css/app.css');
	
	return target.pipe(inject(sourceJs, {
		starttag : '<!-- inject:js -->',
		relative : true
	})).pipe(inject(sourceCss, {
		starttag : '<!-- inject:css -->',
		relative : true
	}))
	.pipe(wiredep({
		directory : 'dist/bower_components',
		onPathInjected : function(fileObject){
			console.log(fileObject);
		}
	})).pipe(gulp.dest('./dist/'));
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

gulp.task('default', ['inject']);