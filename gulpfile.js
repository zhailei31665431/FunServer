'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');

gulp.task('clean', del.bind(null, ['.tmp', 'build']));

//合并router文件，分散开发
gulp.task('concatRoutes',function(){
  var concat = require('gulp-concat');
  gulp.src(['routers/a.js','routers/router/*.js','routers/b.js'])
    .pipe(concat('router.js'))
    .pipe(gulp.dest('routers'))
})

// Watch Files For Changes & Reload
gulp.task('serve',['concatRoutes'],function(){

  var routerFs = require('./routers/router')(router);

  browserSync({
    notify: false,
    server: {
      baseDir: ['.tmp', 'src', 'test'],
      routes:{
        "/bower_components":"bower_components",
        "/test":"test"
      },
      middleware:router
    }
  });
  
  gulp.watch(['routers/router/*.js'],['concatRoutes']);//检测是否发生变化，重新合并文件，手动启动gulp serve

});


