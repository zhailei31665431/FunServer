# FunServer


一个简单的本地前端开发环境，使用gulp+browserSync+express模拟在服务端的数据


gulp用来启动browerSync,expressRouter用来监控请求响应返回的信息，可以使用restful写法，详情见下面代码


'use strict';<br>

// Include Gulp & Tools We'll Use<br>
var gulp = require('gulp');<br>
var del = require('del');<br>
var browserSync = require('browser-sync');<br>
var reload = browserSync.reload;<br>
<br>
// Clean Output Directory<br>
gulp.task('clean', del.bind(null, ['.tmp', 'build']));<br>
<br>
var express = require('express');<br>
var router = express.Router();<br>
var _ = require('underscore');<br>
var fs = require('fs');<br>
<br>
router.route('/url')<br>
  .all(function(req,res,next){<br>
    next();<br>
  })<br>
  .get(function(req,res,next){<br>
    next();<br>
  })<br>
  .post(function(req, res, next){<br>
    var id = {id:parseInt(Math.random(0,100))+''+parseInt(Math.random(0,100))+''+parseInt(Math.random(0,100))}<br>
    var Backdatas = {}<br>
    req.on('data',function(data){<br>
      var datas = {}<br>
      _.each(data.toString().split('&'),function(item){<br>
        var splitData = item.split('=');<br>
        Backdatas[splitData[0]] = splitData[1]<br>
        datas[splitData[0]] = splitData[1];<br>
      })<br>
      fs.writeFile('test/data.json',JSON.stringify(_.extend(datas,id)),function(err){<br>
        if(err) console.log(err)<br>
      })<br>
    })<br>
    req.on('end',function(data){<br>
      res.end(JSON.stringify({code:0,data:(_.extend(Backdatas,id)),systime:Date.parse(new Date())}));  <br>
    })<br>
    next()<br>
  })<br>
  .put(function(req,res,next){<br>
    //更改文件等<br>
  })<br>
  .delete(function(req,res,next){<br>
    //返回信息<br>
  })<br>
<br>
// Watch Files For Changes & Reload<br>
gulp.task('serve',function(){<br>
  browserSync({<br>
    notify: false,<br>
    server: {<br>
      baseDir: ['.tmp', 'src', 'test'],<br>
      routes:{<br>
        "/bower_components":"bower_components",<br>
        "/test":"test"<br>
      },<br>
      middleware:router<br>
    }<br>
  });<br>
});<br>

# 安装

npm install

bower install


