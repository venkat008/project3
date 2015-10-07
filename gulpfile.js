var gulp = require('gulp');
var concat= require('gulp-concat');
var connect= require('gulp-connect');
var browserSync = require('browser-sync').create();
gulp.task('default', function() {
  console.log('welcome');
});

var uglify = require('gulp-uglify');
gulp.task('compress-js', function(){
    gulp.src('js/*.js') // What files do we want gulp to consume?
         .pipe(concat('main.min.js'))
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(gulp.dest('build/js'))
});

gulp.task('compress-css',function(){
  gulp.src('css/*.css')
  .pipe(concat('main.css'))
  .pipe(gulp.dest('build/css'))
});

gulp.task('connect', function(){
  connect.server();
});
gulp.task('browser-sync', function() {
    browserSync.init({

        server: {
            baseDir: "./"
        }
    });
  gulp.watch("css/*.css").on('change', browserSync.reload);
});

// gulp.task('watch', function(){
//   gulp.watch('js/*.js',['compress-js'])
//   gulp.watch('css/*.css',['compress-css'])
//
// });

// gulp.task('default', ['compress-js', 'compress-css']);
