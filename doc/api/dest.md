## gulp.dest(path[,options])
文件流可以被pipe进来，用于写文件（把流中的内容写入到文件）。dest()方法会重新输出传递给它的所有数据，因此可以将流中数据写入多个**文件夹**里。要导入的文件夹不存在时，将自动创建它。要注意这个方法的第一个参数是path，是路径参数，只能用于指定要生成的文件的目录（对应上一句话中加粗的“文件夹”三个字），dest()方法生成文件的文件名使用的是导入到它的文件流自身的**文件名**（只是文件名），所以生成的文件名是由导入到它的文件流决定的，即便path参数是一个带有文件名的路径参数，dest()方法也会把这个文件名当做是目录名。
[官网介绍](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpdestpath-options)

	var gulp = require('gulp');
	gulp.src('script/jquery.js')
		.pipe(gulp.dest('dist/foo.js'));
	//最终生成的文件路径为dist/foo.js/jquery.js

### 关于dest()方法生成文件的路径和给dest()方法传入的path参数之间的关系：
**gulp.dest(path)生成的文件路径是我们传入的path参数后面加上gulp.src()中有通配符开始出现的那部分路径（或者说除去base路径的那部分路径）**  
#### 举几个例子更好说明：  
	
	var gulp = require('gulp');

	//没有通配符出现的情况
	gulp.src('script/avalon/avalon.js')	
		.pipe(gulp.dest('dist'));		//最后生成的文件路径为dist/avalon.js
	
	//有通配符开始出现的那部分路径为**/jquery.js
	gulp.src('script/**/jquery.js')
		//加入匹配到的文件是script/lib/jquery.js
		.pipe(gulp.dest('dist'));		//最后生成的文件路径dist/lib/jquery.js

	//有通配符出现的那部分路径为*
	gulp.src('script/*')
		//假设匹配到文件为script/zepto.js
		.pipe(gulp.dest('dist'));		//最后生成的文件路径是dist/zepto.js

#### 可以在gulp.src()或gulp.dest()方法中配置base属性，来灵活地改变gulp.dest()生成的文件路径。
当没有在gulp.src()方法的options参数中配置base属性时，base的默认值为通配符开始出现之前那部分路径，例如：

	gulp.src('app.src/**/*.js');
	//此时base的默认值app/src
上面提到的关于gulp.dest()方法所生成的文件路径的规则，也可以理解为用gulp.dest()的路径参数path替换掉gulp.src()中的base路径，生成最终的文件路径。例子：
	
	//设置了base参数，此时base路径为'script'
	gulp.src('script/lib/*.js',{base:'script'})
		//假设匹配到的文件为script/lib/jquery.js
		.pipe(gulp.dest('build'));
		//此时生成的文件路径为build/lib/jquery.js