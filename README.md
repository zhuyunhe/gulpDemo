# gulpDemo
用Gulp构建一个前端小工程
用于分享和学习

# 前端自动化
利用一些前端构建工具来自动完成一些机械重复的劳动，解放双手。
##自动化的作用
1. 发布版本、自动刷新、模块管理
2. 文件依赖、框架管理、包依赖
3. 文件合并、文件压缩、自动识图、性能优化
4. 代码前缀、单元测试、代码检查

## 没有自动化工具前

- 手动压缩代码
- 手动合并min.css，min.js等
- 手动压图
- 手动替换路径
- 手动修改版本号

## 用自动化工具后
- 只需在命令行输入相关命令
- 自动执行所用任务，自动监听文件修改状态，自动检测语法，自动提示。

#Gulp
Gulp是基于Node.js的自动任务运行器。
能自动完成js、coffee、sass、less、html、image、css等文件的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，能监听文件修改并自动执行修改后任务。
- 优化前端工作流程，提高效率
- 使用gulp，配置需要的插件，就可以让他自动做以前需要手工做的事情。

# 用到的Gulp插件
### JavaScript相关
1. js文件压缩丑化：[gulp-uglify](https://www.npmjs.com/package/gulp-uglify/)
2. js代码检查：[gulp-jshint](https://www.npmjs.com/package/gulp-jshint/)

### CSS相关
1. css文件压缩：[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css/)

### html相关
1. html文件压缩：[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin/)

### 图片相关
1. 图片压缩：[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin/)

### 文件相关
1. 重命名文件：[gulp-rename](https://www.npmjs.com/package/gulp-rename/)
2. 合并文件：[gulp-concat](https://www.npmjs.com/package/gulp-concat/)