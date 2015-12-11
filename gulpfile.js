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
	del = require('del'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var globs = {
	sass : {
		input : './app/styles/**/*.scss',
		output : './public/css/'
	},
	html : {
		input : './app/*.html',
		output : './public/'
	},
	scripts : {
		input : './app/**/*.js',
		output : './public/scripts/'
	},
	bower : {
		input : './bower_components/**/*',
		output : './public/lib/'	
	},
	assets : {
		input : './app/img/**/*',
		output : './public/img/'
	},
	wiredep : {
		input : 'public/bower_components'
	}
};

gulp.task('bower', function(){
	return bowerSrc()
		.pipe(gulp.dest(bowerOutput));
});

gulp.task('assets', function(){
	gulp.src(globs.assets.input)
		.pipe(gulp.dest(globs.assets.output));
});

gulp.task('html', function(){
	gulp.src('./app/layout/*')
		.pipe(gulp.dest('./public/layout/'));
	gulp.src('./app/content/*')
		.pipe(gulp.dest('./public/content/'));
		
	return gulp.src(globs.html.input)
		.pipe(gulp.dest(globs.html.output));
});

gulp.task('scripts', ['html'], function(){
	return gulp.src(globs.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter(jsHintStylish))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(globs.scripts.output));
});

gulp.task('sass', function () {
	var options = {
		errLogToConsole: true,
		outputStyle: 'expanded'
	};

	return gulp.src(globs.sass.input)
		.pipe(sourcemaps.init())
		.pipe(sass(options).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(wiredep({
            directory: globs.wiredep.input,
        }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(globs.sass.output));
});

gulp.task('clean', function(){
	del(['./public/*', '!./public/bower_components']);
});

gulp.task('inject', [ 'sass', 'scripts', 'html', 'assets'], function(){
	var target = gulp.src('./public/*.html'),
		sourceJs = gulp.src('./public/scripts/app.js'),
		sourceCss = gulp.src('./public/css/app.css');
	
	return target.pipe(inject(sourceJs, {
		starttag : '<!-- inject:js -->',
		relative : true
	})).pipe(inject(sourceCss, {
		starttag : '<!-- inject:css -->',
		relative : true
	}))
	.pipe(wiredep({
		directory : globs.wiredep.input,
		onPathInjected : function(fileObject){
			console.log(fileObject);
		}
	})).pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
	gulp.watch(globs.sass.input, ['sass'])
		.on('change', function(event){
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
	gulp.watch(globs.scripts.input, ['inject'])
		.on('change', function(event){
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});

gulp.task('prod', function(){
	return gulp.src(globs.sass.input)
		.pipe(sass({outputStyle : 'compressed'}))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(concat('app.css'))
		.pipe(gulp.dest(globs.sass.output));
});

gulp.task('serve', ['inject', 'watch'], function(){
	browserSync({
		server : {
			baseDir : 'public'
		}
	});

	gulp.watch(['*.html', 'css/**/*.css', 'scripts/**/*.js'], { cwd : 'public'}, reload);
});

gulp.task('default', ['inject', 'watch', 'serve']);