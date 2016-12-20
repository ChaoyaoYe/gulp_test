var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify'),//提示信息
    linker = require('gulp-linker'); //


gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('./dest'))
    .pipe(notify({ message: 'html task ok' }));
});


gulp.task('img', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true,
        multipass: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('./dest/img/'))
    .pipe(notify({ message: 'img task ok' }));
});
 

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dest/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dest/css'))
    .pipe(notify({ message: 'css task ok' }));
});
 

gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'lint task ok' }));
});
 

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest/'))
    .pipe(notify({ message: 'js task ok' }));
});

 

gulp.task('default', function(){
  gulp.run('img', 'css', 'lint', 'js', 'html');
  gulp.watch('src/*.html', function(){
    gulp.run('html');
  });
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/*.js', ['lint', 'js']);
  gulp.watch('src/img/*', ['img']);
});