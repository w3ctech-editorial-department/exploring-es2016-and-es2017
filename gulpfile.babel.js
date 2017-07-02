// 引入 gulp
import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import minifycss from 'gulp-minify-css';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import rollup from 'gulp-rollup';
import del from 'del';

let paths = {
  script: ['static/js/*.js'],
  css: ['static/css/foundation.css', 'static/css/main.css', 'static/css/app.css', '!static/css/*.min.css'],
  font: ['static/fonts/*.{eot,svg,ttf,woff,woff2}']
};
const WARNING_MESSAGE_REGEXP = /The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten/;
const WARNING_CODE_REGEXP = /THIS_IS_UNDEFINED/;
const DEPENDENCY_WARNING_MESSAGE_REGEXP =  /external dependency/;

// 清除dist
gulp.task('clean', function() {
  return del(['dist/**/*']);
});

// 合并，压缩js文件
let cache = null;
let caches = {};
gulp.task('script', () => {
  return gulp.src(paths.script)
      .pipe(sourcemaps.init())
        // .pipe(babel({
        //   plugins: ['transform-runtime'],
        //   presets: ['env']
        // }))
        .pipe(rollup({
          // any option supported by Rollup can be set here.
          format: 'iife',
          sourceMap: false,
          plugins: [
            require('rollup-plugin-babel')({
              babelrc: false,
              runtimeHelpers: true,
              externalHelpers: false,
              presets: [['es2015', { modules: false }], 'es2015-rollup'],
              plugins: ['external-helpers'],
              // external: ['jQuery', '$',  'window', 'document', 'body', 'console']
            })
          ],
          onwarn(warning, next) {
              // const str = warning.toString();
              if (WARNING_CODE_REGEXP.test(warning.code || '')
                  || DEPENDENCY_WARNING_MESSAGE_REGEXP.test(warning)
                  || WARNING_MESSAGE_REGEXP.test(warning)
              ) { return; }
              next(warning);
              // console.warn( warning.message );
          },
          rollup: require('rollup'),
          entry: ['static/js/index.js'],
          cache: cache,
          separateCaches: caches,
          generateUnifiedCache: true,
          allowRealFiles: false
        }))
        .on('bundle', function(bundle, name) {
          caches[name] = bundle;
        })
        .on('unifiedcache', function(unifiedCache) {
          cache = unifiedCache;
        })
        .pipe(uglify())
        .pipe(rename(function (path) {
          path.basename += ".min";
        }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/js'));
});

// 合并，压缩css文件
gulp.task('css', () => {
  return gulp.src(paths.css)
      .pipe(sourcemaps.init())
        .pipe(concat("bundle.css"))
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/css'));
});

// copy fonts from vendor dependencies
gulp.task('font', () => {
  return gulp.src(paths.font)
    .pipe(gulp.dest('dist/fonts'));
});

// 监听文件变化
gulp.task('watch', () => {
  gulp.watch(paths.script, ['script']);
  gulp.watch(paths.css, ['css']);
});

// 默认任务
gulp.task('default', ['clean','watch', 'script', 'font', 'css']);
