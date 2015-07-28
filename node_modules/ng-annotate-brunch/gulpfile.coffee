gulp = require 'gulp'

coffee = require 'gulp-coffee'

gulp.task 'build', ->
  gulp.src './src/*'
  .pipe coffee
    bare: true
  .pipe gulp.dest './lib'

gulp.task 'watch', ->
  gulp.watch './src/*', ['build']

gulp.task 'default', ['build']