var express = require('express');
var app = express();
var wechat = require('wechat');
var config = {
  token: 'weixin',
  appid: 'wxc0fe8681f03dc6d6',
  encodingAESKey: 'GZpin2nKriPZ0je16oZAt17yC46AdMsLYoOzx3W7E92'
};

var OAuth = require('wechat-oauth');
var client = new OAuth('wxc0fe8681f03dc6d6', 'your secret');


app.get('/', function (req, res) {
  res.send('公众号正在开发测试中!');
 //  var url = client.getAuthorizeURL('http://' + domain + '/weixin/callback','','snsapi_userinfo');
  //res.redirect(url)
});
app.use(express.query());

app.use("/mp", express.static(__dirname + '/mp'));
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
    var message = req.weixin;
    res.reply('公众号正在开发测试中');
}));

var server = app.listen(12345, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('成功启动', host, port);
});
