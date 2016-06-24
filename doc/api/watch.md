## gulp.watch(glob[,opt],tasks) or gulp.watch(glob[,opts,cb])
gulp.watch()用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩丑化等。  
1. glob，要监视的文件匹配模式，规则和用法与gulp.src()方法中的glob相同。
2. opts，配置对象，一般用不到。
3. tasks，数组类型，文件变化后要执行的任务 。 
4. cb：callback，当监视的文件发生变化时的回调函数。 
[官网介绍](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options)  
实际用例：  

	gulp.task('modifyJS',function(){
		console.log('修改了JS文件');
	});
	
	gulp.watch('3.5/js/*.js',['modifyJS']);
	
	gulp.watch('3.5/js/*.js', function(){
		console.log('modify JS');
	});
