var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var browserSync = require('browser-sync').create();
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('default',function(){
	return console.log('hello gulp');
});

//html处理
gulp.task('html',function(){
	var src = './src/*.htm';
	var dest = './dist/';

	return gulp.src(src)
		.pipe(htmlmin({collapseWhitespace:true}))
		.pipe(size())
		.pipe(gulp.dest(dest));
});

gulp.task('html-watch', ['html'], browserSync.reload);

//js处理
gulp.task('js',function(){
	var src = './src/js/*.js';
	var dest = './dist/js';

	gulp.src(src)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(sourcemaps.init())
			.pipe(concat('main.js'))
			.pipe(gulp.dest(dest))
			.pipe(rename({suffix:'.min'}))
			.pipe(uglify())
			.pipe(gulp.dest(dest))
			.pipe(rev())
			.pipe(size())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dest))
		.pipe(rev.manifest())
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
		.pipe(gulp.dest(dest))
		.pipe(rev())
		.pipe(gulp.dest(dest))
		.pipe(rev.manifest())
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
});

//browserSync
gulp.task('browser-sync',function(){
	browserSync.init({
		server:{
			baseDir: "./"
		}
	});
	gulp.watch('./src/*.htm').on('change',browserSync.reload);
	gulp.watch('./src/js/*.js').on('change',browserSync.reload);
	gulp.watch('./src/less/*').on('change',browserSync.reload);
});
