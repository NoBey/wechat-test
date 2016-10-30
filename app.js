var express = require('express');
var webot = require('weixin-robot');
var OAuth = require('wechat-oauth');
var app = express();
var findInformation = require('./StudentInformation.js')
var arrToStr = require('./arrToStr.js')
var findPassword = require('./password.js')
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);

// 指定回复消息
webot.set('hi', '你好');

webot.set('subscribe', {
  pattern: function(info) {
    return info.is('event') && info.param.event === 'subscribe';
  },
  handler: function(info) {
    return '欢迎订阅鉴心针';
  }
});

webot.set('test', {
  pattern: /^test/i,
  handler: function(info, next) {
    next(null, 'roger that!')
  }
})

webot.set('同年', {
  pattern: /^同年/i,
  handler: function(info, next) {
    var limit = 99999
    var skip = 0
    var name = info.text.replace(/同年/, "").replace(/-\d+/, "").replace(' ', "")
      var xh = info.text.match(/\d+/g)
    var reg = eval('/'+name.toUpperCase()+'/')
    var num = info.text.split('-')[1]
    if(num !=undefined && num !=''){
      limit = 50
      skip = (num-1)*50
    }

    findInformation({学号:xh}, function(err, list){
      var data ={
         '生日':list[0]['生日']
      }
      findInformation(data, function(err, list1){
         next(null, arrToStr(list1))
      }, limit, skip)
    }, limit, skip)

  }
})

webot.set('学号', {
  pattern: /^学号/i,
  handler: function(info, next) {
    var xh = info.text.match(/\d+/g)
    findInformation({学号:xh}, function(err, list){
       next(null, arrToStr(list))
    }, 100, 0)
  }
})


webot.set('密码', {
  pattern: /(^密码)|(^pw)/i,
  handler: function(info, next) {
    var xh = info.text.match(/\d+/g)
    findPassword(xh, function(password){
       next(null, password)
    })
  }
})

webot.set('缩写', {
  pattern: /^缩写/i,
  handler: function(info, next) {
    var limit = 99999
    var skip = 0
    var name = info.text.replace(/缩写/, "").replace(/-\d+/, "").replace(' ', "")
    var reg = eval('/'+name.toUpperCase()+'/')
    var num = info.text.split('-')[1]
    if(num !=undefined && num !=''){
      limit = 50
      skip = (num-1)*50
    }

    findInformation({'acronym':reg}, function(err, list){
       next(null, arrToStr(list))
    }, limit, skip)

  }
})

webot.set('班级', {
  pattern: /^班级/i,
  handler: function(info, next) {
    var limit = 99999
    var skip = 0
    var name = info.text.replace(/班级/, "").replace(/-\d+/, "").replace(' ', "")
    var reg = eval('/'+name+'/')
    var num = info.text.split('-')[1]
    if(num !=undefined && num !=''){
      limit = 50
      skip = (num-1)*50
    }

    findInformation({班级:reg}, function(err, list){
       next(null, arrToStr(list))
    }, limit, skip)

  }
})

webot.set('姓名拼音', {
  pattern: /^拼音/i,
  handler: function(info, next) {
    var limit = 99999
    var skip = 0
    var pinyin = info.text.replace(/拼音/, "").replace(/-\d+/, "").replace(' ', "")
    var reg = eval('/'+pinyin.toLowerCase()+'/')
    var num = info.text.split('-')[1]
    if(num !=undefined && num !=''){
      limit = 50
      skip = (num-1)*50
    }

    findInformation({'xm':reg}, function(err, list){
       next(null, arrToStr(list))
    }, limit, skip)

  }
})

webot.set('姓名', {
  pattern: /^姓名/i,
  handler: function(info, next) {
    var limit = 99999
    var skip = 0
    var name = info.text.replace(/姓名/, "").replace(/-\d+/, "").replace(' ', "")
    var reg = eval('/'+name+'/')
    var num = info.text.split('-')[1]
    if(num !=undefined && num !=''){
      limit = 50
      skip = (num-1)*50
    }

    findInformation({姓名:reg}, function(err, list){
       next(null, arrToStr(list))
    }, limit, skip)

  }
})

webot.set('信息', {
  pattern: /^信息/i,
  handler: function(info, next) {

  }
})





// 接管消息请求
webot.watch(app, { token: 'weixin', path: '/wechat' });


// 如果需要多个实例（即为多个微信账号提供不同回复）：


var client = new OAuth('wxaaa2b046e647ea2b', '45d88f65ad72c1a24243ff562465fa52');
app.get('/', function (req, res) {
  var text = '公众号正在开发测试中!'
  var url = client.getAuthorizeURL('http://wx.nobey.cn/ok','ok','snsapi_base');
  var a='<a '+'href="'+ url +'"> 11111</a>'

  res.send(text +a);
 //  var url = client.getAuthorizeURL('http://' + domain + '/weixin/callback','','snsapi_userinfo');
  //res.redirect(url)
});

 app.get('/ok', function (req, res) {

   client.getUserByCode(req.query.code, (err, data)=>{
    res.json(data)
  })
});

// 启动 Web 服务
// 微信后台只允许 80 端口
var server = app.listen(12345, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('成功启动', host, port);
});

// 如果你不想让 node 应用直接监听 80 端口
// 可以尝试用 nginx 或 apache 自己做一层 proxy
// app.listen(process.env.PORT);
// app.enable('trust proxy');
