var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var size = require('gulp-size');

gulp.task('default',function(){
	return console.log('hello gulp');
});

//html处理
gulp.task('html',function(){
	var src = './src/*.htm';
	var dest = './dist/';

	gulp.src(src)
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(size())
		.pipe(gulp.dest(dest));
});

//js处理
gulp.task('js',function(){
	var src = './src/js/*.js';
	var dest = './dist/js';

	gulp.src(src)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(dest))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(size())
		.pipe(gulp.dest(dest));
});

//css处理
gulp.task('css',function(){
	var src = './src/less/*';
	var dest = './dist/css';

	gulp.src(src)
		.pipe(concat('main.css'))
		.pipe(gulp.dest(dest))
		.pipe(rename({suffix:'.min'}))
		.pipe(cleancss())
		.pipe(size())
		.pipe(gulp.dest(dest));
});

//图片处理
gulp.task('images',function(){
	var src = './src/image/*';
	var dest = './dist/image';
	gulp.src(src)
		.pipe(imagemin())
		.pipe(size())
		.pipe(gulp.dest(dest))
})