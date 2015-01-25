# FunServer


一个简单的本地前端开发环境，使用gulp+browserSync+express模拟在服务端的数据


gulp用来启动browerSync,expressRouter用来监控请求响应返回的信息，可以使用restful写法，详情见下面代码


```html
'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'build']));

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');

router.route('/url')
  .all(function(req,res,next){
    next();
  })
  .get(function(req,res,next){
    next();
  })
  .post(function(req, res, next){
    var id = {id:parseInt(Math.random(0,100))+''+parseInt(Math.random(0,100))+''+parseInt(Math.random(0,100))}
    var Backdatas = {}
    req.on('data',function(data){
      var datas = {}
      _.each(data.toString().split('&'),function(item){
        var splitData = item.split('=');
        Backdatas[splitData[0]] = splitData[1]
        datas[splitData[0]] = splitData[1];
      })
      fs.writeFile('test/data.json',JSON.stringify(_.extend(datas,id)),function(err){
        if(err) console.log(err)
      })
    })
    req.on('end',function(data){
      res.end(JSON.stringify({code:0,data:(_.extend(Backdatas,id)),systime:Date.parse(new Date())}));  
    })
    next()
  })
  .put(function(req,res,next){
    //更改文件等
  })
  .delete(function(req,res,next){
    //返回信息
  })

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
```

# 安装

npm install

bower install


