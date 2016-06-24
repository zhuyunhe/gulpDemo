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

gulp.task('modifyJS',function(){
	console.log('修改了JS文件');
});

gulp.watch('3.5/js/*.js',['modifyJS']);

gulp.watch('3.5/js/*.js', function(){
	console.log('modify JS');
});