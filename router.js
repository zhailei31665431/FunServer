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
        var id = parseInt(Math.random(0,100))+''+parseInt(Math.random(0,100))+''+parseInt(Math.random(0,100))
        var Backdatas = {}
        req.on('data',function(data){
          var datas = eval("("+data+")");
          datas['id'] = id;
          var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
          var newData = _.clone(DataList["data"]['list'])
          newData.unshift(datas);
          DataList['data']['list'] = newData
          Backdatas = _.clone(DataList)
          fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(filesData)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));  
        })
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
              item = datas;
            }
          })
          DataList['data']['list'] = newData
          
          Backdatas = _.clone(DataList)
          fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));  
        })
      })
      .delete(function(req,res,next){
        next()
      })
}