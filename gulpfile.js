var gulp = require('gulp');
var cleancss = require('gulp-cleancss');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default',function(){
	console.log('hello gulp');
});

//html处理
gulp.task('html',function(){
	var src = './src/*.html';
	var dest = './dist/';

	gulp.src(src)
		.pipe(htmlmin())
		.pipe(gulp.dest(dest));
});

//js处理
gulp.task('js',function(){
	var src = './src/js/*.js';
	var dest = './dist/js';

	gulp.src(src)
		.pipe(jshint())
		.pipe(jshint.reporter('zyh-JS-report'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(dest))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(dest));
});

//css处理
gulp.task('css',function(){
	var src = './src/css/*.css';
	var dest = './dist/css';

	gulp.src(src)
		.pipe(concat('main.css'))
		.pipe(gulp.dest(dest))
		.pipe(rename({suffix:'.min'}))
		.pipe(cleancss())
		.pipe(gulp.dest(dest));
});

//图片处理
