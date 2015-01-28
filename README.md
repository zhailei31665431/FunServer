# FunServer

一个简单的本地前端开发环境，使用gulp+browserSync+express模拟前端+后端

gulp+browerSync用作服务器监控本地文件发生变化，及时更新浏览器。加入中间件expressRouter用来监控请求响应返回的自己定义的信息，可以使用restful写法，详情见下面代码


#gulpfile.js
```html

'use strict';

var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');

//清除
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

```

#routers下面，router合并后的文件

```html

var _ = require('underscore');
var fs = require('fs');

module.exports = function(router){
    router.route('/spms/project/projects')
      .all(function(req,res,next){
        next();
      })
      .get(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/project-list.json');
        res.end(JSON.stringify(eval("("+data+")")));
        next();
      })
      .post(function(req, res, next){
        var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
        var Backdatas = {}
        req.on('data',function(data){
          var datas = eval("("+data+")");
          datas['id'] = id;
          var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
          var newData = _.clone(DataList["data"]['list']);
          newData.unshift(datas);
          DataList['data']['list'] = newData
          Backdatas = _.clone(datas)
          fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));  
        next()
      })
      .put(function(req,res,next){
        var Backdatas = {}
        req.on('data',function(data){
          var datas = eval("("+data+")");
          var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
          var nowData  = _.clone(DataList['data']['list']);
          _.each(nowData,function(item){
            if(item["id"] == datas["id"]){
              _.extend(item,datas)
            }
          })
          DataList['data']['list'] = nowData
          Backdatas = _.clone(datas)
          fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));  
        })
      })
    router.route('/spms/project/projects/:id')
      .all(function(req,res,next){next()})
      .put(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        req.on('data',function(data){
          var datas = eval("("+data+")");
          var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
          var nowData  = _.clone(DataList['data']['list']);
          _.each(nowData,function(item){
            if(item["id"] == datas["id"]){
              _.extend(item,datas)
            }
          })
          DataList['data']['list'] = nowData
          Backdatas = _.clone(datas);
          fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));  
        })
        next()
      })
      .delete(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        nowData = _.filter(nowData,function(item){
          return item['id']!=id
        });
        DataList['data']['list'] = nowData
        fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
        next()
      })
}

```

# 安装

npm install
