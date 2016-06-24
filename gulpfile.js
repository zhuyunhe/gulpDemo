var gulp = require('gulp');
gulp.task('default',function(){
console.log('hello gulp');
});

gulp.task('one',function(){
	setTimeout(function(){
		console.log('one is done');
	},5000);
});
gulp.task('two', ['one'], function(){
	console.log('two is done');
});