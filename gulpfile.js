'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const sidequest = require('sidequest');
const sidequestDash = require('./src/sidequest-dashboard');
const webpackConfig = require('./webpack.config.js');

gulp.task('server', () => {
    sidequest.use(sidequestDash.port(2000));
    sidequest.initialize();
});

gulp.task('copy', ()=>{
    return gulp.src('./src/web/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('webpack', () => {
    return gulp.src('./src/web/main.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('up', ['copy', 'webpack', 'server']);