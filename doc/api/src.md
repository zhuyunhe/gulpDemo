## gulp.src(globs[,options])
输出与匹配模式（globs）或匹配模式数组相匹配的文件。该方法返回一个Vinyl files的流（虚拟文件对象流），可以被管道输入（piped）到别的插件中。 简单的来说，gulp.src()方法就是用来获取流的，可以理解为用这个方法来读取你需要操作的文件。 
[官网介绍](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options)  
实际用例：
	
	gulp.src('script/*.js');
	gulp.src(['js/*.js','css/*.css','*.html']);
