'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');

var routerFs = require('./routers/router')(router);
gulp.task('clean', del.bind(null, ['.tmp', 'build']));

// Watch Files For Changes & Reload
gulp.task('serve',function(){
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
  
});


