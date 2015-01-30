var _ = require('underscore');
var fs = require('fs');

module.exports = function(router){
//获取评论
router.route('/spms/as/comments(/:id)')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.end(JSON.stringify({code:0,data:{list:[
        {
          app_id: "ZsznND6lcBCSqnkS",
          app_type: "spms_project",
          content: "dsadsadas",
          created_at: "1422434544",
          id: "8D60t1mcgWdYWpw5",
          reply_id: "",
          uid: "xnqRV7CuSjHm5VX8",
          user:{
            avatar: {
              avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm"
            },
            depts: "",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵"
          }
        }
      ],page:{num:89,pageno:1,pagesize:10}},systime:Date.parse(new Date())}));
    next();
  })
router.route('/spms/as/comments')
  .all(function(req,res,next){next()})
  .post(function(req,res,next){
    var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var Backdatas = {item:{
        app_id: "ZsznND6lcBCSqnkS",
        app_type: "spms_project",
        at_oids: "[]",
        at_uids: "[]",
        client_info: "",
        client_type: "",
        contain_info: "[]",
        content: "dsadsadsada",
        created_at: "1422434544",
        domain_id: "0SvtS2hJJSvZL0Fa",
        id: id,
        ip: "",
        mac_addr: "",
        memo: "",
        reply_id: "",
        reply_list: "[]",
        reported_num: "0",
        sys_id: "OSNS",
        uid: "xnqRV7CuSjHm5VX8"
      }}
    req.on('data',function(data){
      var datas = eval("("+data+")");
      datas['user'] = {
        avatar: {
          avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
          avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
        },
        depts: "",
        id: "xnqRV7CuSjHm5VX8",
        name: "卢红兵",
      }
      _.extend(Backdatas['item'],datas);
    })
    req.on('end',function(){
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
    })
    next()
  })
//分享范围的
router.route('/cmri/crossnetuser/searchuser')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.end(JSON.stringify({code:0,data:{list:_.map(_.range(0,10),function(item){
        return {
            avatar: {
              avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=s5dOms5sordV8BCr",
              avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=s5dOms5sordV8BCr"
            },
            contact: {sina: "weibo.com", qq: "456789098", mobile: "13810316109"},
            mobile: "13810316109",
            qq: "456789098",
            sina: "weibo.com",
            email: "heqiao@chinamobile.com",
            extension_num: "33175",
            id: parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100),
            name: "何娇娇"+parseInt(Math.random(0,100)*100),
            online: "online",
            title: "信息系统与安全管理中心技术经理",
            type: "osns_n_user"
          }
      })
      ,page:{num:89,pageno:1,pagesize:10}},systime:Date.parse(new Date())}));
    next()
  })
//项目信息流获取s
router.route('/spms/as/as')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var Backdatas = {
      page:{},
      info:[]
    };
    var datas = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
    var datasList = datas["data"]["info"];
    var url = req.url.split('?')[1].split('&');
    var urlData = {};
    _.each(url,function(item){
      var splitData = item.split('=');
      urlData[splitData[0]] = splitData['1'];
    })
    if(req.url.indexOf('max_id')>-1){
      Backdatas['page']['num'] = datasList.length;
      Backdatas['page']['pageno'] = 0;
      Backdatas['page']['pagesize'] = 20;
      var index = 0;
      _.each(datasList,function(item,i){
        if(item["id"] == urlData["max_id"]) index = i+1;
      });
      Backdatas['info'] = _.rest(datasList,index);
      Backdatas['info'] = _.first(Backdatas['info'],10)
    }else{
      Backdatas['page']['pageno'] = urlData['pageno'];
      Backdatas['page']['pagesize'] = urlData['pagesize'];
      Backdatas['page']['num'] = datasList.length;
      Backdatas['info'] = _.rest(datasList,parseInt(urlData['pageno'])*urlData['pagesize']);
      Backdatas['info'] = _.first(Backdatas['info'],urlData['pagesize']);
    }
    res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
    next();
  })
  .post(function(req,res,next){
    var tm=new Date();
    var id=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12
    var Backdatas = {}
    req.on('data',function(data){
      var datas = eval("("+data+")");
      datas['id'] = id;
      var DataList = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
      var newData = _.clone(DataList["data"]['info']);
      var serverData = {app_id: "b1bHMqcnxraW58gd",app_info: {id: "b1bHMqcnxraW58gd", type: "spms_project"},app_type: "spms_project", as_type: "0", associated_oids: [],attached_info: [],client_info: "",client_type: "",comments_ids: [],comments_num: 0,contain_info: [],content: "dsadasdasdasdasdasd",created_at: "1422327984",doc_flag: "0",domain_id: "0SvtS2hJJSvZL0Fa",
        favorite_flag: 0,favorite_num: 0,file_flag: "0",forward_num: 0,geo: "",id:id,image_flag: "0",ip: "",like_flag: 0,like_num: 0,link_flag: "0",link_info:[],mac_addr: "",memo: "",oid: "",original_id: "",plugin_id: "",plugin_type: "0", post_type: "0",reported_num: 0,retweeted_id: "",rich_dynamic_url: "[]",share_oids: [],share_scope: "Array",share_uids: [],space: "",sys_id: "OSNS",top_flag: 0,uid: "xnqRV7CuSjHm5VX8",user: {
          uid: "xnqRV7CuSjHm5VX8",
          name: "卢红兵",
          type: "osns_n_user",
          avatar: {
            avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
            avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm"
          }
        },video_flag: "0",view_num: 0}
      _.extend(serverData,datas);
      //转换
      serverData['attached_info'] = serverData['append'];
      if(serverData["link"]&&serverData["link"] !='') serverData['link_info'][0] = serverData['link'];
      //转换
      newData.unshift(serverData);
      DataList['data']['info'] = newData;
      DataList['data']['page']['num'] = newData.length;
      Backdatas = _.clone(serverData);
      fs.writeFile('routers/files/project-as.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
    })
    req.on('end',function(){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
    })
    next();
  })
//获取文件
router.route('/spms/as/upload')
  .all(function(req,res,next){next()})
  .post(function(req,res,next){
    var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({code:0,data:{
      allow_download: "1",
      app_id: "",
      app_type: "spms_project",
      append: {
        original:{
          ext_name: "jpg",
          file_size: 265739,
          file_type: "osns_n_image",
          height: 1080,
          link: "http://10.2.5.191/file/vieworiginal?id=oD16FgbaagTJAH7R",
          width: 1920
        },
        preview:{ext_name: "jpg",
          file_size: 26880,
          file_type: "osns_n_image",
          height: 450,
          link: "http://10.2.5.191/file/viewpreview?id=oD16FgbaagTJAH7R",
          width: 800
        },
        thumbnails:{
          ext_name: "jpg",
          file_size: 3942,
          file_type: "osns_n_image",
          height: 101,
          link: "http://10.2.5.191/file/viewthumbnails?id=oD16FgbaagTJAH7R",
          width: 180
        }
      },
      convert_flag: "",
      created_at: "1422340746",
      download_num: "",
      ext_name: "jpg",
      file_size: "",
      file_type: "osns_n_image",
      follow_num: "",
      height: 1080,
      html: "",
      id: id,
      link: "http://10.2.5.191/file/download?id=oD16FgbaagTJAH7R",
      linked_num: "",
      memo: "",
      post_ip: "10.2.41.48",
      share_num: "",
      share_oids: "",
      share_scope: "",
      share_uids: "",
      show_name: "4",
      tag: "",
      trans_flag: 0,
      uid: "xnqRV7CuSjHm5VX8",
      version_flag: "0",
      version_num: "0",
      viewed_num: "",
      width: 1920},systime:Date.parse(new Date())}));
    next();
  })
//获取链接接口
router.route('/spms/as/url')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({code:0,data:{
      body_data: {
        flashvar: "http://player.youku.com/player.php/sid/XODgwNDY4NDIw_ev_4/v.swf",
        host: "youku.com",
        image: "http://g2.ykimg.com/1100641F4654C868FD66411894F5A1033AE947-F347-7ACD-818A-E673B4B7F279"
      },
      descript: "",
      favicon: "",
      logo: "p",
      title: "第六集 艺考女神养成记 足尖上的青春",
      url: "http://v.youku.com/v_show/id_XODgwNDY4NDIw_ev_4.html?from=y1.3-idx-grid-1519-9909.86808-86807.7-2",
      url_type: "osns_link_video"},systime:Date.parse(new Date())}));
    next();
  })
  






  //项目list列表
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
  //项目单条编辑
  router.route('/spms/project/projects/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/project-list.json');
        var datas = eval("("+data+")");
        _.each(datas["data"]["list"],function(item){
          if(id==item["id"]){
            res.end(JSON.stringify({code:0,data:{item:item},systime:Date.parse(new Date())}));
            next();
          }
        })
    })
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
  //项目关注
  router.route('/spms/project/follow/:id')
    .all(function(req,res,next){next()})
    .put(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        var Backdatas = {};

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
          Backdatas.obj_id = Backdatas.id;
          fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:{item:Backdatas},systime:Date.parse(new Date())}));
        })
        next()
      })
  //项目树
  router.route('/spms/project/tree')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-tree.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
  //里程碑列表
  router.route('/spms/milestone/milestone')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-milestone.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

  //项目燃尽图
  router.route('/spms/project/progress/:id')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-progress.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })











//结尾
}