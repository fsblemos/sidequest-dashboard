'use strict';

const gulp = require('gulp')
const webpack = require('gulp-webpack');
const sidequest = require('sidequest');
const sidequestDash = require('./src/sidequest-dashboard');

gulp.task('server', () => {
    sidequest.use(sidequestDash.port(2000));
    sidequest.initialize();
});

gulp.task('copy', ()=>{
    return gulp.src('./src/web/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', () => {
    return gulp.src('.')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('.dist/'));
});