var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', function(){
  return gutil.log('Gulp is running')
})

gulp.watch('Client/**/*.js', ['jshint']);

gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('Server/**/*.js', ['jshint']);
  gulp.watch('Client/**/*.js', ['jshint']);
});