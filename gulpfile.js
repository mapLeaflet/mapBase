/*
 * npm 和  brew 目录放在上层, 是的下层所有项目都可以使用
 * npm 和  brew 目录 不能放在单独文件夹里, 必须和项目目录平级才能运行
 *
 * */

const gulp = require("gulp"),
    concat = require("gulp-concat"),
    connect = require('gulp-connect'),//服务器
    Proxy = require('gulp-connect-proxy'),//服务器端口扩展
    Proxy2 = require('http-proxy-middleware'),//服务器端口扩展
    less = require('gulp-less'),
    watchLess = require('gulp-watch-less'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    order = require("gulp-order"), //按顺序合并文件
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cmd = require('gulp-cmd'),
    cmdPack = require('gulp-cmd-pack'),
    minifyCSS = require('gulp-minify-css'),
    path = require('path');




//获取党建路径的上层目录, 以便于找到 npm库
const str = path.dirname(__dirname);


//获取str 目录的上层目录,以便于找到 local_modeules
const strSuper=path.resolve(str, '..');



//页面要用的公共js..用join路径拼接
const npm = path.join(strSuper, 'node_modules');
const bower = path.join(strSuper, 'bower_components');
const localModules = path.join(strSuper, 'local_modules');





//使用中国地图源
const ChineseTmsProviders = localModules + "/leaflet/Leaflet.ChineseTmsProviders/src/*";

//公共的js库 和css库
gulp.task('modules', function (cb) {



    gulp.src(ChineseTmsProviders).pipe(gulp.dest('src/js/plug'));






});




const jsPath = __dirname + "/src/js/**/*.js";
//自己写的js
gulp.task('js', function (cb) {


    //js模块压缩合并
    pump([

            gulp.src([jsPath]),
            sourcemaps.init(),

            // order([
            //
            //     // "data_source/*.js", //在这个文件夹里的文件 先合并
            //     "plug/*.js", //在这个文件夹里的文件 先合并
            //     "class/*.js", //在这个文件夹里的文件 先合并
            //     // "control/*.js", //在这个文件夹里的文件 先合并
            //
            // ]),
            uglify({
                mangle: true,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩

            }),
            // concat('maps.js'),
            // cmd(),
            sourcemaps.write(''),
            gulp.dest('build/')
        ],
        cb
    );
});




//静态服务器
gulp.task('connect', function () {
    connect.server({
        root: ['./'],
        port: 7070,
        livereload: true,
        middleware: function (connect, opt) {

            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
        }
        // middleware:function (connect,opt) {
        //     return[Proxy2('/server',{
        //         target: 'http://220.197.219.235:8089/YHPC/oneScreen/titleNum',
        //         // cookieDomainRewrite: { "unchanged.domain": "unchanged.domain", "old.domain": "new.domain", "*": "" }
        //         changeOrigin: true,
        //     })]
        //
        //
        // }
    });
});





gulp.task('watch', ['js'], function () {

    gulp.watch(jsPath, ['js']);

});