var express = require('express');
var webot = require('weixin-robot');
var OAuth = require('wechat-oauth');
var WechatAPI = require('wechat-api');
var app = express();
var findInformation = require('./StudentInformation.js')
var arrToStr = require('./arrToStr.js')
var findPassword = require('./password.js')
const charset = require('superagent-charset');
const request = require('superagent');
const equipment = require('./equipment.json')
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

webot.set('电费', {
  pattern: /^电费/i,
  handler: function(info, next) {
    var url = '127.0.0.1:11011'
    var t = info.text.replace(/电费/, "").replace(' ', "")
    var lou = t.substr(0, t.length - 3)
    var room = t.substr(t.length - 3, t.length)
    var roomid = ''
    console.log(lou + '-' + room)
    if(equipment.hasOwnProperty(lou)){
      if(equipment[lou].hasOwnProperty(room)){
        roomid = equipment[lou][room]
        roomid = roomid.substr(0, roomid.length - 2)
        request.post('http://'+ url +'/info/findSurplusElectricByMeterSearchPower.action')
          .type('form')
          .send({
            equipmentInfoId: roomid
          })
          .end((err, res) => {

            next(null, '剩余电量: ' + res.body.num + '\n'+ '状态: ' + res.body.state)
          })
      }
    }
   next(null, '没有找到宿舍, 检查输入格式 例如: 31号楼123 . ps:桃李园需要前面 加 桃李园')
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
  var url = client.getAuthorizeURLForWebsite('http://wx.nobey.cn/code','ok','snsapi_base');
  var a='<a '+'href="'+ url +'"> 11111</a>'
  var url1 = client.getAuthorizeURLForWebsite('http://wx.nobey.cn/token','ok','snsapi_base');
  var a1='<a '+'href="'+ url +'"> 2222</a>'
  res.send(text +a+a1);
 //  var url = client.getAuthorizeURL('http://' + domain + '/weixin/callback','','snsapi_userinfo');
  //res.redirect(url)
});
var api = new WechatAPI('wxaaa2b046e647ea2b', '45d88f65ad72c1a24243ff562465fa52');
api.updateRemark('open_id', 'remarked', function (err, data, res) {
  // TODO
});

var ment = {
  "button": [{
    "type": "click",
    "name": "今日歌曲",
    "key": "V1001_TODAY_MUSIC"
  }, {
    "name": "菜单",
    "sub_button": [{
      "type": "view",
      "name": "搜索",
      "url": "http://www.soso.com/"
    }, {
      "type": "click",
      "name": "赞一下我们",
      "key": "V1001_GOOD"
    }]
  }]
}

api.createMenu(ment, (err, data)=>{
  console.log(data)
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
