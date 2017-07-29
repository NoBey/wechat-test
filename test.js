const koa = require('koa')
const app = new koa()

var OAuth = require('wechat-oauth');
var client = new OAuth('wxaaa2b046e647ea2b', '45d88f65ad72c1a24243ff562465fa52');
const ss = client.getAuthorizeURL('http://wx.nobey.cn/code', 'wxoauth', 'snsapi_userinfo')
console.log(client.getAuthorizeURLForWebsite('http://wx.nobey.cn/code'))
console.log(ss)


var router = require('koa-router')();

app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/',async (ctx)=>{
  ctx.body = '<a href='+ ss +'>登陆</a>'
})

router.get('/code', async(ctx) => {
  client.getAccessToken(ctx.query.code, function(err, result) {
    console.log(result)
    var accessToken = result.data.access_token;
    var openid = result.data.openid;
    client.getUser(openid, function(err, dd) {
      console.log(dd)
      ctx.body = dd;
    });
  });
})


// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaaa2b046e647ea2b&redirect_uri=http://wx.nobey.cn&response_type=code&scope=snsapi_base&state=123#wechat_redirect
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaaa2b046e647ea2b&redirect_uri=http://wx.noeby.cn&response_type=code&scope=snsapi_base&state=123#wechat_redirect

app.listen(80)
