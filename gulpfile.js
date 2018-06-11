// 引入gulp
var gulp = require('gulp');
// 引入服务器插件
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
// 引入编译sass插件
var sass = require('gulp-sass');
// 引入压缩css插件
var mincss = require('gulp-clean-css');
// 引入压缩js插件
var uglify = require('gulp-uglify');

// 起服务
gulp.task('server', function () {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            host: 'localhost',
            open: true,
            middlewear: function (req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
            }
        }));
});

// 编译，压缩scss
gulp.task('sass', function () {
    gulp.watch('src/scss/style.scss', function () {
        gulp.src('src/scss/*.scss')
            .pipe(sass())
            .pipe(mincss())
            .pipe(gulp.dest('src/css'));
    });
});

// 压缩js
gulp.task('minjs', function () {
    gulp.src('src/js/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

// 默认
gulp.task('default', ['sass', 'minjs', 'server']);